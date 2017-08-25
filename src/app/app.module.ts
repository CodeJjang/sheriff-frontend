import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {Facebook} from '@ionic-native/facebook';
import {BackgroundMode} from '@ionic-native/background-mode';
import {IonicStorageModule} from '@ionic/storage';


import {HttpModule} from '@angular/http';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {BountyPage} from '../pages/bounty/bounty';
import {StatisticsPage} from '../pages/statistics/statistics';
import {GeneralStatisticsPage} from '../pages/general-statistics/general-statistics';
import {PersonalStatisticsPage} from '../pages/personal-statistics/personal-statistics';
import {AboutPage} from '../pages/about/about';

import {AppService} from "../services/app.service";
import {HomeService} from "../services/home.service";

import {StatusBar} from '@ionic-native/status-bar';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaCapture} from '@ionic-native/media-capture';
import {CameraPreview} from '@ionic-native/camera-preview';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation} from '@ionic-native/geolocation';
import {LocationTracker} from '../providers/location-tracker';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '278a9abc'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BountyPage,
    LoginPage,
    StatisticsPage,
    AboutPage,
    GeneralStatisticsPage,
    PersonalStatisticsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BountyPage,
    LoginPage,
    StatisticsPage,
    AboutPage,
    GeneralStatisticsPage,
    PersonalStatisticsPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    BackgroundMode,
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    HomeService,
    ScreenOrientation,
    MediaCapture,
    CameraPreview,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
