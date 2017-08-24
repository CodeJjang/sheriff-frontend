import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {NgZone} from '@angular/core';
import { LocationTracker } from '../../providers/location-tracker';

import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from '@ionic-native/camera-preview';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isSheriffActivated: boolean = false;
  private sheriffButtonUrl = 'assets/images/become_sheriff_icon.png';
  private lastImage: string = null;
  private timeoutId: number = undefined;
  private isLandscape: boolean;

  constructor(public navCtrl: NavController,
    public plt: Platform,
    private screenOrientation: ScreenOrientation,
    private locationTracker: LocationTracker,
    private zone: NgZone,
    private cameraPreview: CameraPreview) {

    this.stop();
    this.updateIsLandscape();
    this.screenOrientation.onChange().subscribe(() => this.updateIsLandscape());
  }

  private updateIsLandscape() {
    console.log(this.screenOrientation.type)
    this.isLandscape = this.screenOrientation.type.startsWith("landscape");
  }

  onClickBecomeSheriff() {
    console.log('#onClickBecomeSheriff called');
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 5,
      y: 5,
      width: 150,
      height: 150,
      camera: 'rear',
      toBack: false
    };

    if (!this.isSheriffActivated) {
      // start camera
      console.log('Starting camera...');
      
      this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
          this.locationTracker.startTracking();

          const takePic = () => {
            if (!this.isSheriffActivated) return;
            
            console.log("taking picture");

            (this.cameraPreview.takePicture as any)(e => {
              console.log("took it! " + e[0].substring(0,100));
              console.log("was at " + this.locationTracker.lat + "/" + this.locationTracker.lng);
              this.zone.run(() => this.lastImage = 'data:image/jpeg;base64,' + e[0]);
              setTimeout(takePic, 300);
            }, e => alert("kaka " + e));
          };

          this.timeoutId = setTimeout(() => {
            // this.cameraPreview.setFocusMode(this.cameraPreview.FOCUS_MODE.CONTINUOUS_PICTURE);
            takePic()
          }, 1000);
        },
        (err) => {
          console.log("Start failed " + err.message || err)
        });
    } else {
      this.stop();
    }
    this.isSheriffActivated = !this.isSheriffActivated;

  }

  private stop() {
    this.locationTracker.stopTracking();      
    console.log('Stopping camera...');
    this.cameraPreview.stopCamera().then(e => console.log("stopped", e)).catch(e => console.error("could not stop", e));
    clearTimeout(this.timeoutId);
    this.lastImage = null; 
  }
}