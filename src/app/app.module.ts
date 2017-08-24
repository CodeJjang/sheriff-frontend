import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage, ListPage, BountyPage, StatisticsPage, AboutPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServerApiProvider } from '../providers/server-api/server-api';

import { Facebook }  from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BountyPage,
    StatisticsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BountyPage,
    StatisticsPage,
    AboutPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerApiProvider
  ]
})
export class AppModule {}
