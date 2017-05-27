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

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginMenu = false;
    this.signupMenu = false;
    this.success = false;
  }

  loginClicked() {
    this.loginMenu = !this.loginMenu;
  }

  signUpClicked() {
    this.signupMenu = !this.signupMenu;
  }

  authenticate( nameInput: HTMLInputElement, pwInput: HTMLInputElement ){
    if( this.usersService.verify('philemon', 'tan') ){
      // this.router.navigate(['/home','philemon','tan']);
      this.router.navigate(['/home', 'philemon', 'tan']);
    }
  }
}
