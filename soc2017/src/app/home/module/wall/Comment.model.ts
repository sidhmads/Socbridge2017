import {User} from '../../../models/User.model';

export class Comment {
  public content: any;
  public user: User;

  constructor(content: any, user: User) {
    this.content  = content;
    this.user = user;
  }

}
