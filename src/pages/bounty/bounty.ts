import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { sBounty } from "../../model/sBounty";

@Component({
  selector: 'page-bounty',
  templateUrl: 'bounty.html'
})
export class BountyPage {

  bounties: sBounty[];

  constructor(public navCtrl: NavController) {

  }

  
}
