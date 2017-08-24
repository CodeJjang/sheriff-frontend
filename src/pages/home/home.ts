import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerApiProvider } from "../../providers/server-api/server-api";

// import { CameraPreview } from "ionic-native";

import { Platform } from 'ionic-angular';

const win = window as any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage: any = HomePage;

  constructor(public navCtrl: NavController, private serverApi: ServerApiProvider, platform: Platform) {

    platform.ready().then(() => {
      const CameraPreview = win.CameraPreview;

      let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: true,
        previewDrag: false
      };


      CameraPreview.stopCamera();
      CameraPreview.startCamera(options, console.log.bind(console), console.error.bind(console));
      CameraPreview.takePicture({}, args => alert("win " + args), args => alert("kaka " + args));
    });
  }
}