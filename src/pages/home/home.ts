import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
  private lastImage: string = null;
  private intervalNumber: number = undefined;
  private isLandscape: boolean;

  constructor(public navCtrl: NavController,
    public plt: Platform,
    private screenOrientation: ScreenOrientation,
    private cameraPreview: CameraPreview) {
    this.plt.ready().then((readySource) => {
      this.cameraPreview.stopCamera().then(e => console.log("stopped", e)).catch(e => console.error("could not stop", e));
      console.log('ready')
      // console.log('window.plugins', (window as any).plugins);
      // console.log('CameraPreview', CameraPreview);
      // console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
    });

    this.updateIsLandscape();
    this.screenOrientation.onChange().subscribe(() => this.updateIsLandscape());
  }

  private updateIsLandscape() {
    console.log(this.screenOrientation.type)
    this.isLandscape = this.screenOrientation.type.startsWith("landscape");
  }

  onClickBecomeSheriff() {
    console.log('clicked');
    // this.mediaCapture.captureImage()
    //   .then(
    //     (data: MediaFile[]) => console.log(data),
    //     (err: CaptureError) => console.error(err)
    //   );
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 50,
      y: 50,
      width: window.screen.width - 100,
      height: window.screen.height - 150,
      camera: 'rear',
      toBack: true,
      alpha: 1
    };

    if (!this.isSheriffActivated) {
      // start camera
      console.log('Starting camera...');

      this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
          console.log("taking picture");

          const takePic = () => {
            (this.cameraPreview.takePicture as any)(e => this.lastImage = 'data:image/jpeg;base64,' + e[0], e => console.log("kaka", e));
          };

          this.intervalNumber = setInterval(takePic, 300);

          // return this.cameraPreview.takePicture(undefined).then(e => console.log(e.substr(50))).catch(e => console.log("kaka", e));
        },
        (err) => {
          console.log(err)
        });
    } else {
      console.log('Stopping camera...');
      this.cameraPreview.stopCamera();
      clearInterval(this.intervalNumber);
      this.lastImage = null;
    }
    this.isSheriffActivated = !this.isSheriffActivated;

  }
}
