import { Component, OnInit } from '@angular/core';
import {WallModel} from '../Wall.model';
import {UsersService} from '../../../../Users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  newPost = false;


  Posts: WallModel[] = [
    new WallModel('First Post',
      'The missile, launched at a steep angle, reached an altitude of 2,000km (1,242 miles) and travelled about 700km, ' +
      'landing in the sea west of Japan. North Korea said on Monday it was a test of the abilities of a ' +
      '\"newly developed ballistic rocket\". ' ,
      this.userService.getUserByName('siddharth')),
    new WallModel('Second Post',
      'The missile, launched at a steep angle, reached an altitude of 2,000km (1,242 miles) and travelled about 700km, ' +
      'landing in the sea west of Japan. North Korea said on Monday it was a test of the abilities of a ' +
      '\"newly developed ballistic rocket\". ' ,
      this.userService.getUserByName('siddharth')),
    new WallModel('Third Post',
      'The missile, launched at a steep angle, reached an altitude of 2,000km (1,242 miles) and travelled about 700km, ' +
      'landing in the sea west of Japan. North Korea said on Monday it was a test of the abilities of a ' +
      '\"newly developed ballistic rocket\". ' ,
      this.userService.getUserByName('siddharth')),
    new WallModel('Fourth Post',
      'The missile, launched at a steep angle, reached an altitude of 2,000km (1,242 miles) and travelled about 700km, ' +
      'landing in the sea west of Japan. North Korea said on Monday it was a test of the abilities of a ' +
      '\"newly developed ballistic rocket\". ' ,
      this.userService.getUserByName('siddharth')),
    new WallModel('Fifth Post',
      'The missile, launched at a steep angle, reached an altitude of 2,000km (1,242 miles) and travelled about 700km, ' +
      'landing in the sea west of Japan. North Korea said on Monday it was a test of the abilities of a ' +
      '\"newly developed ballistic rocket\". ' ,
      this.userService.getUserByName('siddharth'))
  ];

  module: string;
  constructor( private userService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onPressed() {
    this.newPost = true;
  }

}

