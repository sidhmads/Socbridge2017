import { User } from './models/User.model';
import { Post } from './models/Post.model';
import { Comment } from './models/Comment.model';
import { Http, Response, Headers } from '@angular/http'; // this is Angular's http service
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {


  constructor(private http: Http,
              private router: Router) {}



}

