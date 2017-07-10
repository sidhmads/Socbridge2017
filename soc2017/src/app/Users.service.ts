import { User } from './models/User.model';
import { Module } from './models/Module.model';
import { Course } from './models/Course.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {DescriptionService} from './home/module/Description.service';

@Injectable()
export class UsersService {

  constructor(private http: Http, private descriptionService: DescriptionService) {}

  public user: User;
  public FEmodArr = [];

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
}
