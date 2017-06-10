import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';



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


  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService) { }

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
  }

  loginClicked() {
    this.loginMenu = !this.loginMenu;
  }

  signUpClicked() {
    this.signupMenu = !this.signupMenu;
  }

  authenticate() {
    if ( this.usersService.verify(this.loginUsername, this.loginPassword) ) {
      this.router.navigate(['/home', this.loginUsername, 'course']);
    } else {
      this.loginFailed = true;
      this.loginUsername = '';
      this.loginPassword = '';
    }
  }


  register(){
    if (this.signUpFirstName === '' || this.signUpLastName === '' ||
       this.signUpEmail === ''  || this.signUpCourse === ''  ||
       this.signUpPassword === '' ) {
          this.resetFields();
          this.signUpFailed = true;
    } else {
       this.httpService.register()
         .subscribe(
            data => console.log(data),
            error => console.error(error)
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
