import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { sBounty } from "../../model/sBounty";
import { Storage } from '@ionic/storage';

import { BountyService } from '../../services/bounty.service';

@Component({
  selector: 'page-bounty',
  templateUrl: 'bounty.html'
})
export class BountyPage  implements OnInit {

  bounties: sBounty[];
  private user: any;
  private total = "...";

  constructor(public navCtrl: NavController, 
              private storage: Storage,
              private bountyService: BountyService) {
                this.user = {};
                this.storage.get("user").then(u => this.user=u);                
              }

  ngOnInit() {
      this.getBounties();
  }

  getBounties() {
      this.bountyService.getBounties().then(obs =>
                  obs.subscribe( currencies => { 
                    this.bounties = currencies;
                    this.total = "" + this.bounties.map(b => b.Amount).reduce((cp, p) => cp + p, 0);
                  },
                  error => console.log("BOUNTY FETCH ERROR - " + JSON.stringify(error))
      ));
  }
}
