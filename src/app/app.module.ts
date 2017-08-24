import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {Facebook} from '@ionic-native/facebook';
// import {NativeStorage} from '@ionic-native/native-storage';
// import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';


import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import { BountyPage } from '../pages/bounty/bounty';
import {StatisticsPage} from '../pages/statistics/statistics';

import {StatusBar} from '@ionic-native/status-bar';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaCapture} from '@ionic-native/media-capture';
import {CameraPreview} from '@ionic-native/camera-preview';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '278a9abc'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BountyPage,
    LoginPage,
    StatisticsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BountyPage,
    LoginPage,
    StatisticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    MediaCapture,
    CameraPreview,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
