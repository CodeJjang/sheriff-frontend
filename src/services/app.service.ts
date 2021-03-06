import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable }  from 'rxjs/Rx';

@Injectable()
export class AppService {
    public domain: string = 'http://sherrifapi.azurewebsites.net/';

    public headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });

    public options = new RequestOptions({headers: this.headers});

    constructor(
        private http: Http
    ) { }
}