import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from "./app.service";

import { ToastController } from 'ionic-angular';

import { homeAlert } from "../model/homeAlert";

@Injectable()
export class HomeService {

    constructor(
        public toastCtrl: ToastController,
        private http: Http,
        private appService: AppService
    ) { }

    sendImage(homeAlert: homeAlert) {
        let route = 'api/SnapshotHandler/receive';
        let objectToSend = JSON.stringify(Object.assign({
            userId: ""
        }, homeAlert));

        return this.http.post(this.appService.domain + route, objectToSend, this.appService.options)
            .subscribe(e => {
                const target = e.json();

                console.log("Snapshot received - " + JSON.stringify(target));
                if (!target) return;

                this.toastCtrl.create({
                    message: `סחטיין, עזרת לנו בשמירה על החוק :-)`
                });
            }), e => console.log("Error snapshot - " + JSON.stringify(e));
    }
}
