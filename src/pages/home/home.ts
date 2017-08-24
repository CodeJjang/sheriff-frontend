import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public plt: Platform,
              private cameraPreview: CameraPreview) {
    this.plt.ready().then((readySource) => {
      console.log('ready')
      // console.log('window.plugins', (window as any).plugins);
      // console.log('CameraPreview', CameraPreview);
      // console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
    });
  }

  onClickBecomeSheriff() {
    console.log('clicked');
    // this.mediaCapture.captureImage()
    //   .then(
    //     (data: MediaFile[]) => console.log(data),
    //     (err: CaptureError) => console.error(err)
    //   );
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: false,
      alpha: 1
    };

    if(!this.isSheriffActivated) {
      // start camera
      console.log('Starting camera...');
      this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
    } else {
      console.log('Stopping camera...');
      this.cameraPreview.stopCamera();
    }
    this.isSheriffActivated = !this.isSheriffActivated;

  }
}
