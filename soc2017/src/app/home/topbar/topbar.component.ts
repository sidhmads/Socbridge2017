import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User.model';
import {Module} from '../../models/Module.model';
import {Course} from '../../models/Course.model';
import {UsersService} from '../../Users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {



  constructor() {
  }

  ngOnInit() {
  }

}
