import {User} from '../../../models/User.model';

export class WallModel {
  public title: string;
  public content: string;
  public user: User;

  constructor(title: string, content: string, user: User) {
    this.title = title;
    this.content = content;
    this.user = user;
  }
}
