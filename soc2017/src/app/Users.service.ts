import { User } from './models/User.model';
import { Module } from './models/Module.model';
import { Course } from './models/Course.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {DescriptionService} from './home/module/Description.service';

@Injectable()
export class UsersService {
  constructor(private http: Http, private descriptionService: DescriptionService) {}

  public byModule: Module[] = [];
  public temp: Module[] = [];
  public byCourse: Course[] = [];
  public Users: User[] = [
    new User('Philemon',
      'tan',
      'http://i.imgur.com/XqGLoAM.png',
      'Computer Engineering',
      2,
      ['CS1010', 'CS1020', 'CS1231', 'MA1505', 'MA1506'],
      [], 'asdsad@hotmail.com', 'asdasd'),
    new User('siddharth',
      'madhavan',
      'http://imgur.com/eA8qWn8.png',
      'Computer Engineering',
      2,
      ['CS1010', 'CS1020', 'CS1231', 'MA1505', 'MA1506'],
      [], 'asdsad@hotmail.com', 'asdsadasd')
  ];
  public moduleAdded = false;
  public courseAdded;
  public user: User;
  public FEmodArr =[];

  createFeUserFromBeObj(BeUser: any){
    return (
      new User(
        BeUser.firstName, BeUser.lastName, 'http://i.imgur.com/XqGLoAM.png',
        BeUser.course, 2, [], [], BeUser.email, BeUser.password
      )
    );
  }


  initializeUserData() {
    const storageObj = JSON.parse(localStorage.getItem('user'));
    const BEmodArr = storageObj.modules;
    var tempMod;
    for(var i=0; i<BEmodArr.length; i++){
      tempMod = BEmodArr[i];
      this.FEmodArr.push(new Module(tempMod.module_code, []));
      this.descriptionService.ModsTaken.push(tempMod['module_code']);
    }
    console.log(this.FEmodArr);
    this.user = new User(
      storageObj.firstName,
      storageObj.lastName,
      'http://i.imgur.com/XqGLoAM.png',
      storageObj.course,
      2,
      this.FEmodArr,
      [],
      storageObj.email,
      storageObj.password
    );
    this.descriptionService.compute();
  }

  signOut() {
    this.FEmodArr = [];
  }

  getCurrentUser() {
    return this.user;
  }


  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }


  // initializeData() {
  //   this.user = JSON.parse(localStorage.getItem('token'));
  // }



  verify(inputName: string, inputpw: string){
    if (inputName === 'philemon' && inputpw === 'tan'){
      return true;
    } else if (inputName === 'siddharth' && inputpw === 'madhavan') {
      return true;
    } else {
      return false; // for debugging purposes
      // return false;
    }
  }


  verify1(inputName: string, inputpw: string) {
    // this.http.post
  }



  // to get the user object
  getUserByName(firstName: string) {
    for (const i of this.Users) {
      if (i.firstName === firstName) {
        return i;
      }
    }
  }




  getModules(user: string) {
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
