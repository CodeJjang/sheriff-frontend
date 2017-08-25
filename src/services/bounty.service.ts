import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from "./app.service";
import { Storage } from '@ionic/storage';

import { sBounty } from "../model/sBounty";

@Injectable()
export class BountyService {

    constructor(
        private http: Http,
        private appService: AppService, 
        private storage: Storage,
    ) { }

    getBounties(): Promise<Observable<sBounty[]>> {
        var route = 'api/Bounty/GetUserBounties';
        
        return this.storage.get("user").then(user => {
            const userId = user.userID

             return this.http.get(this.appService.domain + route + "?userId=" + userId, this.appService.options)
                    .map((res: Response) => <sBounty[]>JSON.parse(res.json()))
                    .catch((error: any) => {
                        return Observable.throw(error.json().error || 'Server Error');
                });
        });
    }
}
