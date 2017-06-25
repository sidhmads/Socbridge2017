import {User} from "../models/User.model";

export class LoginService {
  private tempUser = null;
  constructor() {}

  storeCred(user: User){
    this.tempUser = user;
  }
  getUser() {
    return this.tempUser;
  }
}

