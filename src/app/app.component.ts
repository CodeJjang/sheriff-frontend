import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';

import {HomePage, ListPage, BountyPage, StatisticsPage, AboutPage, LoginPage} from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private storage: NativeStorage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage},
      {title: 'Bounty', component: BountyPage},
      {title: 'Statistics', component: StatisticsPage},
      {title: 'About', component: AboutPage},
      {title: 'Sign Out', component: null} // handled in 'openPage' method
    ];

    this.storage.getItem('user').then(logged => {
      if (logged) {
        console.log('User is logged in, redirecting to Home Page...');
        this.rootPage = HomePage;
      } else {
        console.log('User is logged out, redirecting to Login Page...');
        this.rootPage = LoginPage;
      }
    }).catch((e) => console.log('Error extracting user from storage', e));

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
      this.activePage = page;
      return;
    }

    console.log('Sign out...');
  }

  isPageActive(page) {
    return page === this.activePage;
  }
}
