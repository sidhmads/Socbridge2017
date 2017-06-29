import { User } from './models/User.model';
import { Post } from './models/Post.model';
import { Comment } from './models/Comment.model';
import { Http, Response, Headers } from '@angular/http'; // this is Angular's http service
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  herokusDomain = '';
  localDomain = 'http://localhost:3000/';

  constructor(private http: Http,
              private router: Router) {}

  signUp(newUser: User) {
    var userCopy = newUser;
    console.log('Signup attempted');
    const body = JSON.stringify(userCopy);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'user/signUp', body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) =>  Observable.throw(error.json()));
  }

  signIn(loginCred: User) {
    const userCopy = loginCred;
    console.log('Signin attempted');
    const body = JSON.stringify(userCopy);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'user/signIn', body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signOut() {
    localStorage.clear();
  }

  populate(modulesArr: {
    modules: string[]
  }) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(modulesArr);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'user/populate' + token, body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  sendNewPost(post: Post) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(post);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'posts/newPost' + token, body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  sendNewComment(comment: Comment) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(comment);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'posts/newComment' + token, body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  editPost(post: Post) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(post);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'posts/editPost' + token, body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deletePost(post: Post) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(post);
    const header = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.herokusDomain + 'posts/deletePost' + token, body, {headers: header})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}

