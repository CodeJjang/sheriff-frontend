import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {NativeStorage} from '@ionic-native/native-storage';
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
              private storage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onFacebookLoginClick() {
    this.fb.login(this.permissions)
      .then((res: FacebookLoginResponse) => this.onSuccessfulFacebookLogin(res))
      .catch(e => console.log('Error logging into Facebook', e));
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  onSuccessfulFacebookLogin(res: FacebookLoginResponse) {
    console.log('Successfully logged in from facebook.');
    console.log('authResponse:', JSON.stringify(res.authResponse));

    let nav = this.navCtrl;
    let env = this;

    let userId = res.authResponse.userID;
    let params = new Array<string>();
    console.log('Querying facebook API for user details...');
    env.fb.api("/me?fields=name", params)
      .then(function (user) {
        console.log('Facebook API returned user', JSON.stringify(user));

        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        console.log('Saving user in local storage...');
        return env.storage.setItem('user', {
          name: user.name,
          picture: user.picture,
          accessToken: res.authResponse.accessToken
        });
      })
      .then(()=> {
        console.log('User saved, moving to HomePage...');
        nav.push(HomePage);
        return Promise.resolve();
      })
      .catch((e) => console.log('Error querying API and inserting to native storage', e));
  }


}
