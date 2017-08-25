import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from "./app.service";

import { sBounty } from "../model/sBounty";

@Injectable()
export class HomeService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    getBounties(): Observable<sBounty[]> {
        var route = 'api/Bounty/GetUserBounty';

        return this.http.get(this.appService.domain + route, this.appService.options)
                    .map((res: Response) => <sBounty[]>res.json())
                    .catch((error: any) => {
                        return Observable.throw(error.json().error || 'Server Error');
                });
    }
}
