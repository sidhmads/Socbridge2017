import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMenu: boolean;
  signupMenu: boolean;
  success: boolean;
  loginFailed: boolean;
  inputUsername: string;
  inputPassword: string;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginMenu = false;
    this.signupMenu = false;
    this.success = false;
    this.loginFailed = false;
    this.inputUsername = '';
    this.inputPassword = '';
  }

  loginClicked() {
    this.loginMenu = !this.loginMenu;
  }

  signUpClicked() {
    this.signupMenu = !this.signupMenu;
  }

  authenticate() {
    if ( this.usersService.verify(this.inputUsername, this.inputPassword) ) {
      this.router.navigate(['/home', this.inputUsername, 'course']);
  } else {
      this.loginFailed = true;
      this.inputUsername = '';
      this.inputPassword = '';
    }
  }
}
