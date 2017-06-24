import {User} from './User.model';
import {Comment} from './Comment.model';

export class Post {
  public title: string;
  public content: string;
  public user: User;
  public mod: string;
  public comments: Comment[];
  public id: string;

  public newComBool: boolean;
  public showCommentsBool: boolean;
  public editPostBool: boolean;
  public deletePostBool: boolean;
  public ownerBool: boolean;

  constructor(title: string, content: string, user: User, mod: string, id: string, commentArr: Comment[], ownerBool: boolean) {
    this.title = title;
    this.content = content;
    this.user = user;
    this.mod = mod;
    this.comments = commentArr;
    this.id = id;
    this.ownerBool = ownerBool;

    this.showCommentsBool = false;
    this.newComBool = false;
    this.editPostBool = false;
    this.deletePostBool = false;
  }

  getComments() {
    return this.comments;
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  showAllComments() {
    if (this.showCommentsBool === false) {
      this.showCommentsBool = true;
      this.newComBool = false;
      this.editPostBool = false;
      this.deletePostBool = false;
    } else {
      this.showCommentsBool = false;
    }
  }

  showPostEdit() {
    if (this.editPostBool === false) {
      this.editPostBool = true;
      this.newComBool = false;
      this.showCommentsBool = false;
      this.deletePostBool = false;
    } else {
      this.editPostBool = false;
    }
  }

  showNewCommentEditor() {
    if (this.newComBool === false) {
      this.newComBool = true;
      this.showCommentsBool = false;
      this.editPostBool = false;
      this.deletePostBool = false;
    } else {
      this.newComBool = false;
    }
  }

  showDelete() {
    if (this.deletePostBool === false) {
      this.deletePostBool = true;
      this.newComBool = false;
      this.editPostBool = false;
      this.showCommentsBool = false;
    } else {
      this.deletePostBool = false;
    }
  }
}
