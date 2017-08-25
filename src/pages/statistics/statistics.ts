import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
// import {GeneralStatisticsPage} from '../general-statistics/general-statistics';
import {PersonalStatisticsPage} from '../personal-statistics/personal-statistics';
import {GeneralStatisticsPage} from "../general-statistics/general-statistics";
/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'statistics-page',
  templateUrl: 'statistics.html'
})
export class StatisticsPage {

  private personalStatisticsPage: any = PersonalStatisticsPage;
  private generalStatisticsPage: any = GeneralStatisticsPage;
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.isAndroid = platform.is('android');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

}


