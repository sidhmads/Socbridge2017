import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/Post.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Comment } from '../../../models/Comment.model';
import { UsersService } from '../../../Users.service';
import { HttpService } from '../../../http.service';
import { User } from '../../../models/User.model';
import { WallService } from './Wall.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  newPost = false;
  title = '';
  editorContent = '';
  editorOptions = {
    placeholder: 'insert content...'
  };
  commentContent = '';
  commentOptions = {
    placeholder: 'insert content...'
  };
  currentModStr ='';

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private wallService: WallService) {
  }

  ngOnInit() {
    var wallSvc = this.wallService;
    var userSvc = this.userService;
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.currentModStr = params['module'];
          this.wallService.removeAll();
          var storageUserObj = JSON.parse(localStorage.getItem('user'));
          var storageModArr = storageUserObj.modules;
          storageModArr.forEach(function(storageModObj) {//loops through each BE module
            if (storageModObj.module_code === params['module']) {
              storageModObj.posts.forEach(function(storageModObjPost){//loops through each post
                  var commentArr = [];
                  storageModObjPost.comments.forEach(function(storageModObjPostComment){//loops through each comment
                    commentArr.push(new Comment(
                      storageModObjPostComment.content,
                      userSvc.createFeUserFromBeObj(storageModObjPostComment.user),
                      storageModObjPostComment.post
                    ));
                  });
                  wallSvc.addPost(new Post(
                    storageModObjPost.title,
                    storageModObjPost.content,
                    userSvc.createFeUserFromBeObj(storageModObjPost.user),
                    params['module'],
                    storageModObjPost._id,
                    commentArr
                  ));
              });
            }
          });
        }
      );
  }

  onPressed() {
    this.newPost = true;

  }
  clicked() {
    this.newPost = false;
    var tempPost = new Post(this.title, this.editorContent, this.userService.getCurrentUser(), this.currentModStr, '', []);
    this.wallService.addPost(tempPost);
    // this.Posts.push(new Post(this.title, this.editorContent, this.userService.getUserByName('siddharth')));
    this.editorContent = '';
    this.title = '';

    this.httpService.sendNewPost(tempPost)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error);
        }
      );

  }
  cancelNewPost() {
    this.newPost = !this.newPost;
  }

  newComment(post: Post) {
    if (this.commentContent.length > 0) {
      var newComment = new Comment(this.commentContent, this.userService.getCurrentUser(), post.id);
      post.addComment(newComment);
      this.httpService.sendNewComment(newComment)
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.error(error);
          }
        );
    }
    post.newComment();
    this.commentContent = '';
  }





}
