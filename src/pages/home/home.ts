import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServerApiProvider} from "../../providers/server-api/server-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private serverApi: ServerApiProvider) {

  }

}
