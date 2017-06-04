import { Component, OnInit } from '@angular/core';
import {WallModel} from '../Wall.model';
import {UsersService} from '../../../../Users.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../Comment.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  newPost = false;
  title = '';
  editorContent = '';
  editorOptions = {
    placeholder: 'insert content...'
    };
  commentContent = '';
  commentOptions = {
    placeholder: 'insert content...'
  }


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
  clicked() {
    this.newPost = false;
    this.Posts.push(new WallModel(this.title, this.editorContent, this.userService.getUserByName('siddharth')));
    this.editorContent = '';
    this.title = '';

  }

  newComment(wall: WallModel) {
    if (this.commentContent.length > 0) {
      wall.addComment(new Comment(this.commentContent, this.userService.getUserByName('siddharth')));
    }
    wall.newComment();
    this.commentContent = '';
  }




}

