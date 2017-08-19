import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import buildUrl from 'build-url';

/*
  Generated class for the ServerApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServerApiProvider {
  private baseUrl = "https://sheriff.com/api";
  private snapshotsUrl = buildUrl(this.baseUrl, '/snapshots');
  private sheriffsUrl = buildUrl(this.baseUrl, '/sheriffs');
  private bountiesUrl = buildUrl(this.baseUrl, '/bounties');
  private statisticsUrl = buildUrl(this.baseUrl, '/statistics');
  private authUrl = buildUrl(this.baseUrl, '/auth');

  constructor(public http: Http) {
    console.log('Hello ServerApiProvider Provider');
  }

  postSnapshot(snapshot){
    console.log("Post snapshot");
  }

  getBounties() {
    return new Promise(resolve => {
      this.http.get(this.bountiesUrl)
        .subscribe(res => resolve(res.json()));
    });
  }

}
