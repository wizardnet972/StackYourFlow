import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_STACKOVERFLOW_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';

@Injectable()
export class QuestionsService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }
  
  encodeObjectToParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }

  search(query): Observable<string> {
    let params = new URLSearchParams(this.encodeObjectToParams(query));
    
    this.optionsNoPre.search = params;
    return this.http.get(`${API_BASE_STACKOVERFLOW_URL}` + 'questions/no-answers', this.optionsNoPre)
      .map(res => res.json());
  }
}
