import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { sBounty } from "../../model/sBounty";

import { BountyService } from '../../services/bounty.service';

@Component({
  selector: 'page-bounty',
  templateUrl: 'bounty.html'
})
export class BountyPage  implements OnInit {

  bounties: sBounty[];

  constructor(public navCtrl: NavController, 
              private bountyService: BountyService) {}

  ngOnInit() {
      this.getBounties();
  }

  getBounties() {
      this.bountyService.getBounties().then(obs =>
                  obs.subscribe( currencies => this.bounties = currencies,
                  error => console.log(<any>error)
      ));
  }
}
