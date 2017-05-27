import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMenu: boolean;
  signupMenu: boolean;
  success: boolean;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loginMenu = false;
    this.signupMenu = false;
  }

  loginClicked(){
    this.loginMenu = !this.loginMenu;
  }

  signUpClicked(){
    this.signupMenu = !this.signupMenu;
  }

  authenticate(nameInput: HTMLInputElement, pwInput: HTMLInputElement){
    this.success = this.usersService.verify(nameInput.value, pwInput.value);
  }

}
