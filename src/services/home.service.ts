import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import { AppService } from "./app.service";

@Injectable()
export class HomeService {

    constructor(
        private http: Http,
        private appService: AppService
    ) { }

    sendImage(homeAlert: any) {
        let route = 'api/SnapshotHandler/receive';
        let objectToSend = JSON.stringify(homeAlert);

        return this.http.post(this.appService.domain + route, objectToSend, this.appService.options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                    return Observable.throw(error.json().error || 'Server Error');
        });
    }
}
