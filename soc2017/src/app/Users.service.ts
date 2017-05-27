import {User} from './models/User.model';
import {Module} from './models/Module.model';
import {Course} from './models/Course.model';

export class UsersService {
  private byModule: Module[] = [];
  private temp: Module[] = [];
  private byCourse: Course[] = [];
  private Users: User[] = [
    new User('philemon','tan','test','CEG',2,[],[]),
    new User('siddarth','madhavan','test','CEG',2,[],[])
  ];
  private moduleAdded = false;
  private coursAdded = false;



  getUsers() {
    return this.Users;
  }

  addUser(user: User) {
    this.Users.push(user);
    this.temp = [];
    for (const x of user.modules) {
      for (const i of this.byModule) {
        if (x === i.moduleName) {
          i.users.push(user);
          this.moduleAdded = true;
          break;
        }
      }
      if (!this.moduleAdded) {
        this.temp.push(new Module(x, [user]));
      }
      this.moduleAdded = false;
    }
    this.byModule.push(...this.temp);
    // for byCourse
    for (const x of this.byCourse) {
      if (user.course === x.name) {
        x.addUser(user);
        this.coursAdded = true;
        break;
      }
    }
    if (!this.coursAdded) {
      this.byCourse.push(new Course(user.course, [user]));
    }
    this.coursAdded = false;
  }
  // to get the user object
  getUserByName(firstName: string, lastName: string) {
    for (const i of this.Users) {
      if (i.firstName === firstName && i.lastName === lastName ) {
        return i;
      }
    }
    return null;
  }
  // to get the module objects the user takes
  getUserModules(user: User) {
    const moduleTaken: Module[] = [];
    for (const module of user.modules) {
      for (const obj of this.byModule) {
        if (module === obj.moduleName) {
          moduleTaken.push(obj);
        }
      }
    }
    return moduleTaken;
  }
  getCourse(user: User) {
    for (const fac of this.byCourse) {
      if (fac.name === user.course) {
        return fac;
      }
    }
  }
  getModuleByName(module: string) {
    for (const mod of this.byModule) {
      if (mod.moduleName === module) {
        return mod;
      }
    }
    return null;
  }

  verify(inputName: string, inputpw: string){
    return true;
  }
}
