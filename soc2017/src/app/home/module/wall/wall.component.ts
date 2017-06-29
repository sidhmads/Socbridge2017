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
                    commentArr,
                    storageModObjPost.user._id === storageUserObj._id || storageModObjPost.user === storageUserObj._id
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
    var tempPost = new Post(this.title, this.editorContent, this.userService.getCurrentUser(), this.currentModStr, '', [], true);
    // this.wallService.addPost(tempPost);
    // this.Posts.push(new Post(this.title, this.editorContent, this.userService.getUserByName('siddharth')));
    this.editorContent = '';
    this.title = '';

    this.httpService.sendNewPost(tempPost)
      .subscribe(
        data => {
          console.log(data);
          tempPost.id = data.postId;
          this.wallService.addPost(tempPost);
          //adding to local storage
          var currModStr = this.currentModStr;
          var tempBeUser = JSON.parse(localStorage.getItem('user'));
          tempBeUser.modules.forEach(function(mod){
            if (mod.module_code === currModStr) {
              mod.posts.push(data.post);
            }
          });
          localStorage.setItem('user', JSON.stringify(tempBeUser));
        },
        error => {
          console.error(error);
        }
      );

  }
  cancelNewPost() {
    this.newPost = !this.newPost;
  }
  cancelNewComment(post: Post) {
    post.showNewCommentEditor();
  }

  newComment(post: Post) {
    var currModStr = this.currentModStr;
    if (this.commentContent.length > 0) {
      var newComment = new Comment(this.commentContent, this.userService.getCurrentUser(), post.id);
      //current post adding comment
      post.addComment(newComment);
      //storing comment in local storage
      var tempBeUser = JSON.parse(localStorage.getItem('user'));
      tempBeUser.modules.forEach(function(mod){
        if (mod.module_code === currModStr) {
          mod.posts.forEach(function(postItr){
            if (postItr._id === post.id) {
              postItr.comments.push(newComment);
            }
          });
        }
      });
      localStorage.setItem('user', JSON.stringify(tempBeUser));
      //rest call for comment
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
    post.showNewCommentEditor();
    post.showAllComments();
    this.commentContent = '';
  }

  saveEditedPost(post: Post) {
    post.showPostEdit();
    var currModStr = this.currentModStr;
    //edit local storage's user and post
    var tempBeUser = JSON.parse(localStorage.getItem('user'));
    tempBeUser.modules.forEach(function(mod){
      if (mod.module_code === currModStr) {
        mod.posts.forEach(function(postItr){
          if (postItr._id === post.id) {
            postItr.content = post.content;
            postItr.title = post. title;
            console.log('found and edited');
          }
        });
      }
    });
    localStorage.setItem('user', JSON.stringify(tempBeUser));
    //send rest call to edit
    this.httpService.editPost(post)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error);
        }
      );
  }





}
