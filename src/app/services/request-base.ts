import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class RequestBase {
  headers = new Headers();
  noPreFlightHeaders = new Headers();
  options = new RequestOptions({
    headers: this.headers,
    withCredentials: false
  });
  optionsNoPre = new RequestOptions({
    headers: this.noPreFlightHeaders,
    withCredentials: false
  });
  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');

    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
  }
}
