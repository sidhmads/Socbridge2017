import {User} from './User.model';

export class Module {
  public moduleName: string;
  public users: User[];
  public clicked: boolean;

  constructor(name: string, users: User[], clicked: boolean) {
    this.moduleName = name;
    this.users = users;
    this.clicked = clicked;
  }
}
