import { Component, OnInit } from '@angular/core';
import {User} from '../models/User.model';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../Users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UsersService) {
  }
  ngOnInit() {
  }
}
