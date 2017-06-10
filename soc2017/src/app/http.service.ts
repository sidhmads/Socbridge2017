import { User } from './models/User.model';
import { Http, Response, Headers } from '@angular/http'; // this is Angular's http service
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  myStr = {
    content: 'CS1010'
  };

  constructor(private http: Http) {}

  register() {
    console.log('Hi');
    const body = JSON.stringify(this.myStr);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/rest/newModule', body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}

