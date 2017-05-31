import {User} from './models/User.model';
import {Module} from './models/Module.model';
import {Course} from './models/Course.model';

export class UsersService {
  private byModule: Module[] = [];
  private temp: Module[] = [];
  private byCourse: Course[] = [];
  private Users: User[] = [
    new User('philemon', 'tan', 'http://imgur.com/u4ZgiJN.png', 'Computer Engineering', 2, ['CS1010', 'CS1020', 'CS121', 'MA1505', 'MA1506'], []),
    new User('siddharth', 'madhavan', 'http://imgur.com/eA8qWn8.png', 'Computer Engineering', 2, ['CS1010', 'CS1020', 'CS1231', 'MA1505', 'MA15'], [])
  ];
  private moduleAdded = false;
  private courseAdded;


  verify(inputName: string, inputpw: string){
    if(inputName === 'philemon' && inputpw === 'tan'){
      return true;
    }
    else if (inputName === 'siddharth' && inputpw === 'madhavan') {
      return true;
    }
    else{
      return false;
    }
  }

  // to get the user object
  getUserByName(firstName: string) {
    for (const i of this.Users) {
      if (i.firstName == firstName) {
        return i;
      }
    }
  }




  getModules(user:string){
    return
  }

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
        this.courseAdded = true;
        break;
      }
    }
    if (!this.courseAdded) {
      this.byCourse.push(new Course(user.course, [user]));
    }
    this.courseAdded = false;
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

}
