import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onFacebookLoginClick() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

}
