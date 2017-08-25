import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
// import {NativeStorage} from '@ionic-native/native-storage';
import {Storage} from '@ionic/storage';
import {HomePage} from '../home/home';
import {Promise} from 'es6-promise';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginBackgroundUrl = 'assets/images/intro_background.png';
  private permissions = ['public_profile', 'user_friends', 'email'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook,
              private storage: Storage, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onFacebookLoginClick() {
    if (this.platform.is('cordova')) {
      console.log('Running on mobile, authenticating with facebook...');
      this.fb.login(this.permissions)
        .then((res: FacebookLoginResponse) => this.onSuccessfulFacebookLogin(res))
        .catch(e => console.log('Error logging into Facebook', e));
      // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    } else {
      console.log('Running on browser, skipping facebook and mocking user...');

      let user = {
        userID: '10207158110789998',
        name: 'Aviad Moreshet'
      };
      let accessToken = 'EAAEotw0iCMkBAEZCRh5suzz0cqX8atFjV0ufaR9h1umaZAZCYxYZAWhysOQZBkmLZACKPIHfXRyVtphLi49ULaJDDqNVsDixF335DpJoTXX8UjlEnSOsBhGEZCZBLAlGDKdOm0hABRgOfQqvHeyLQrPXyT3T1RXBnHmJaMGo7sGZBFUBZCHEZBwB6pZAdiLumoCUpIcaVpjzFmBJyspSgZBdxpYquVTiXB8tftyUZD';
      this.saveUserToStorage(user, accessToken)
        .then(() => this.navigateHomePage())
        .catch(e => console.log('Error saving user to storage', e));
    }

  }

  onSuccessfulFacebookLogin(res: FacebookLoginResponse) {
    console.log('Successfully logged in from facebook.');
    console.log('res:', JSON.stringify(res));
    let env = this;

    let userId = res.authResponse.userID;
    let params = new Array<string>();
    console.log('Querying facebook API for user details...');
    env.fb.api("/me?fields=name", params)
      .then((user) => {
        console.log('Facebook API returned user', JSON.stringify(user));

        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        user.userID = userId;
        console.log('Saving user in local storage...');
        return this.saveUserToStorage(user, res.authResponse.accessToken);
      })
      .then(() => this.navigateHomePage())
      .catch((e) => console.log('Error querying API and inserting to native storage', e));
  }

  saveUserToStorage(user, accessToken) {
    return this.storage.set('user', {
      userID: user.userID,
      name: user.name,
      picture: user.picture,
      accessToken: accessToken
    }).then(() => {
      console.log('User saved, moving to HomePage...');
      return Promise.resolve();
    });
  }

  navigateHomePage() {
    this.navCtrl.setRoot(HomePage);
    return Promise.resolve();
  }

}
