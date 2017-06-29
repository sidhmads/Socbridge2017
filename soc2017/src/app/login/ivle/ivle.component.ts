import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../Users.service';
import {User} from '../../models/User.model';
import {HttpService} from 'app/http.service';

@Component({
  selector: 'app-ivle',
  templateUrl: './ivle.component.html',
  styleUrls: ['./ivle.component.css']
})
export class IVLEComponent implements OnInit {

  private access_token;
  private module;
  private profile;
  private api_key = 'Nxm9ocEZtuEeyUn3ed4Ci';
  private ivleRetrievedModules = {
    modules: []
  };
  private lapiUrl = {
    url: ''
  };

  constructor(private http: Http,
              private route: ActivatedRoute,
              private userService: UsersService,
              private router: Router,
              private httpService: HttpService) {
    this.access_token = (this.route.snapshot.queryParams['token']);
    this.profile = this.http.request('https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey='
      + this.api_key + '&AuthToken=' + this.access_token);
    this.module = this.http.request('https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey='
      + this.api_key + '&AuthToken=' + this.access_token +
      '&Duration=5000&IncludeAllInfo=true');

  }

  ngOnInit() {
    this.lapiUrl.url = 'https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey='
      + this.api_key + '&AuthToken=' + this.access_token +
      '&Duration=5000&IncludeAllInfo=true';
    this.httpService.populate(this.lapiUrl)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('user', data.userObj);
          localStorage.setItem('message', data.message);
          this.userService.initializeUserData();
          console.log(data.ivleRetrievedModules);
          this.ivleRetrievedModules = data.moduleArrObj;
        },
        error => console.error(error)
      );
  }

  continue() {
    localStorage.clear();
    this.router.navigate(['']);

  }

}
