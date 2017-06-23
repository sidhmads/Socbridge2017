import { Post } from '../../../models/Post.model';
import { Injectable } from '@angular/core';
import {HttpService} from '../../../http.service';

@Injectable()

export class WallService {
  wallPosts: Post[] = [];

  constructor(private httpService: HttpService){}

  addPost(wallPost: Post) {
    this.wallPosts.push(wallPost);
  }
  getPosts() {
    return this.wallPosts;
  }
  removeAll() {
    this.wallPosts = [];
  }
  removeOne(post: Post) {
    //send rest call
    this.httpService.deletePost(post)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error);
        }
      );
    //removing from current copy in service for visible update
    var idToRemove;
    for (var i=0; i<this.wallPosts.length; i++) {
      if (this.wallPosts[i].id === post.id) {
        idToRemove = i;
      }
    }
    this.wallPosts.splice(idToRemove , 1);
    //remove from localstorage
    var currModStr = post.mod;
    var indexToRemove;
    var tempBeUser = JSON.parse(localStorage.getItem('user'));
    tempBeUser.modules.forEach(function(mod){
      if (mod.module_code === currModStr) {
        mod.posts.forEach(function(postItr, index){
          if (postItr._id === post.id) {
            indexToRemove = index;
          }
        });
        mod.posts.splice(indexToRemove, 1);
      }
    });
    localStorage.setItem('user', JSON.stringify(tempBeUser));
  }
}
