import {User} from './User.model';
import {Comment} from './Comment.model';

export class Post {
  public title: string;
  public content: string;
  public user: User;
  public mod: string;
  public showComments: boolean;
  public newCom: boolean;
  public comments: Comment[];
  public id: string;

  constructor(title: string, content: string, user: User, mod: string, id: string, commentArr: Comment[]) {
    this.title = title;
    this.content = content;
    this.user = user;
    this.mod = mod;
    this.showComments = false;
    this.newCom = false;
    this.comments = commentArr;
    this.id = id;
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
