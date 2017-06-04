import {User} from '../../../models/User.model';
import {Comment} from './Comment.model';

export class WallModel {
  public title: string;
  public content: string;
  public user: User;
  public showComments: boolean;
  public newCom: boolean;
  public comments: Comment[];


  constructor(title: string, content: string, user: User) {
    this.title = title;
    this.content = content;
    this.user = user;
    this.showComments = false;
    this.newCom = false;
    this.comments = [];
  }

  getComments() {
    return this.comments;
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }
  showAllComments() {
    this.showComments = !this.showComments;
  }
  newComment() {
    this.newCom = !this.newCom;
  }
}
