import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../models/User.model';
import { JwtHelper } from 'ng2-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // menu viewers
  loginMenu: boolean;
  signupMenu: boolean;
  // login properties
  loginFailed: boolean;
  loginUsername: string;
  loginPassword: string;
  // sign up properties
  signUpFailed: boolean;
  signUpFirstName: string;
  signUpLastName: string;
  signUpEmail: string;
  signUpPassword: string;
  signUpCourse: string;
  duplicateUserBool: boolean;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private jwtHelper: JwtHelper) { }

  ngOnInit() {
    this.loginMenu = false;
    this.signupMenu = false;

    this.loginFailed = false;
    this.loginUsername = '';
    this.loginPassword = '';

    this.signUpFailed = false;
    this.signUpFirstName = '';
    this.signUpLastName = '';
    this.signUpEmail = '';
    this.signUpPassword = '';
    this.signUpCourse = '';
    this.duplicateUserBool = false;
  }

  loginClicked() {
    this.loginMenu = !this.loginMenu;
  }

  signUpClicked() {
    this.signupMenu = !this.signupMenu;
  }

  signIn() { // used for existing users
    const newUser = new User('', '',
      '/', '', 0, [], [], this.loginUsername, this.loginPassword);
    this.httpService.signIn(newUser)
      .subscribe(
          data => {
              localStorage.setItem('token', data.token);
              localStorage.setItem('userId', data.userId);
              localStorage.setItem('user', data.userObj);
              localStorage.setItem('message', data.message);
              this.usersService.initializeUserData();
              this.router.navigate(['home', this.usersService.getCurrentUser().firstName, 'course']);
          },
          error => {
            console.error(error);
            this.loginFailed = true;
          }
      );
  }

  signIn2() {// used right after sign up
    const newUser = new User('', '',
      '/', '', 0, [], [], this.signUpEmail, this.signUpPassword);
    this.httpService.signIn(newUser)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('user', data.userObj);
          localStorage.setItem('message', data.message);
          this.usersService.initializeUserData();
          this.router.navigate(['home', this.usersService.getCurrentUser().firstName, 'course']);
        },
        error => {
          console.error(error);
          this.loginFailed = true;
        }
      );
  }

  signUp() {
    if (this.signUpFirstName === '' || this.signUpLastName === '' ||
       this.signUpEmail === ''  || this.signUpCourse === ''  ||
       this.signUpPassword === '' ) {
          this.resetFields();
          this.signUpFailed = true;
    } else {
      const newUser = new User(this.signUpFirstName, this.signUpLastName,
      '/', this.signUpCourse, 0, [], [], this.signUpEmail, this.signUpPassword);

      this.httpService.signUp(newUser)
        .subscribe(
          data => {
            console.log(data);
            this.signIn2();
          },
          // error => console.error(error)
          error => {
            console.log(error);
            this.resetFields();
            this.duplicateUserBool = true;
          }
        );
    }
  }

  resetFields(){
    this.loginUsername = '';
    this.loginPassword = '';
    this.signUpFirstName = '';
    this.signUpLastName = '';
    this.signUpEmail = '';
    this.signUpPassword = '';
    this.signUpCourse = '';
  }

}
