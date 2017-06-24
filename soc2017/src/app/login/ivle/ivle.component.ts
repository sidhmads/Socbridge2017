import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../Users.service";
import {User} from "../../models/User.model";


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
  private modules: String[] = [];
  private moduleNames: String[] = [];

  constructor(private http: Http, private route: ActivatedRoute, private userService: UsersService, private router: Router) {
    this.access_token = (this.route.snapshot.queryParams['token']);
    this.profile = this.http.request('https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey='
      + this.api_key + '&AuthToken=' + this.access_token);
    this.module = this.http.request('https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey='
      + this.api_key + '&AuthToken=' + this.access_token +
      '&Duration=5000&IncludeAllInfo=true');

  }

  ngOnInit() {

    this.module.subscribe(
      (res: Response) => {
        const result = res.json()['Results'];
        for (const mod of result) {
          // this.userService.getCurrentUser().modules.push(mod['CourseCode']);
          this.moduleNames.push(mod['CourseName'])
        }
      }
    );
  }
  continue() {
     this.router.navigate(['home', this.userService.getCurrentUser().firstName, 'course'])
  }

}
