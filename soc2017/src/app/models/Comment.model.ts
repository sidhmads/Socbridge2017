import {User} from './User.model';


export class Comment {
  public content: any;
  public user: User;
  public post: string;

  constructor(content: any, user: User, post: string) {
    this.content  = content;
    this.user = user;
    this.post = post;
  }

}
