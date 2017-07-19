import { User } from './models/User.model';
import { Module } from './models/Module.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {DescriptionService} from './home/module/Description.service';

@Injectable()
export class UsersService {

  constructor(private http: Http, private descriptionService: DescriptionService) {}
  public socket: any =null;
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
      this.FEmodArr.push(new Module(tempMod.module_code, [], false));
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
    this.socket.emit('unsubscribe', this.user.firstName);
  }

  getCurrentUser() {
    return this.user;
  }

  setSocket(socket:any) {
    this.socket = socket;
  }

  onToggle(mod: Module) {
    for (const module of this.FEmodArr) {
      if (mod !== module) {
        module.clicked = false;
      }
    }

  }
}
