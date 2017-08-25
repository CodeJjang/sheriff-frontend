import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from "./app.service";
import { Storage } from '@ionic/storage';

import { ToastController } from 'ionic-angular';

import { homeAlert } from "../model/homeAlert";

@Injectable()
export class HomeService {

    constructor(
        public toastCtrl: ToastController,
        private http: Http,
        private storage: Storage,
        private appService: AppService
    ) { }

    sendImage(homeAlert: homeAlert) {
        let route = 'api/SnapshotHandler/receive';
        return this.storage.get("user").then(user => {
            let objectToSend = JSON.stringify(Object.assign({
                userId: user.userID
            }, homeAlert));

            return this.http.post(this.appService.domain + route, objectToSend, this.appService.options)
                .subscribe(e => {
                    const target = e.json();

                    console.log("Snapshot received - " + JSON.stringify(target));
                    if (!target) return;

                    this.toastCtrl.create({
                        message: `סחטיין, עזרת לנו בשמירה על החוק :-)`,
                        position: "bottom",
                        duration: 5000
                    }).present();
                }), e => console.log("Error snapshot - " + JSON.stringify(e));
        });
    }
}
