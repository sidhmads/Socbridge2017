import {User} from './User.model';

export class Module {
  public moduleName: string;
  public users: User[];

  constructor(name: string, users: User[]) {
    this.moduleName = name;
    this.users = users;
  }
}
