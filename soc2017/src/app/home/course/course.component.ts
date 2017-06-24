import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/User.model';
import { UsersService } from '../../Users.service';
import { HttpService } from '../../http.service';
import { JwtHelper} from 'ng2-jwt';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  currentUser: User = new User('test', 'test', 'test', 'test', 5, ['test', 'test2'], [], 'asdas@hotmail.com', 'asdasd');

  ivleRetrievedModules = {
    modules: []
  };

  testUser: User;
  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private httpService: HttpService,
              private jwtHelper: JwtHelper) {
    // this.route.parent.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.currentUser = this.userService.getUserByName(params['firstName']);
    //     }
    //   );

    // const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    // this.testUser = new User(
    //   decodedToken.user.firstName,
    //   decodedToken.user.lastName,
    //   '/',
    //   decodedToken.user.course,
    //   3,
    //   decodedToken.user.modules,
    //   [],
    //   decodedToken.user.email,
    //   decodedToken.user.password
    // );

    this.testUser = this.userService.getCurrentUser();
    console.log(this.userService.getCurrentUser().modules);
    this.ivleRetrievedModules.modules = this.userService.getCurrentUser().modules;
  }
  ngOnInit() {

  }

  populate() {
    this.httpService.populate(this.ivleRetrievedModules)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
  }
}
