import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as io from 'socket.io-client';
import {UsersService} from '../../../Users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  localDomain = 'http://localhost:3000';
  herokuDomain = 'http://socbridge.herokuapp.com';
  socket:any =null;
  currentModStr = '';
  typedMessage:string;
  messages = [];
  currUser;
  currMembers;
  newMsg: string;
  joiningInfo: string[];

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.socket.emit('unsubscribe', this.currUser.firstName);
          //reset current member list when module changes
          this.currMembers = [];
          //set current module
          this.currentModStr = params['module'];
          this.joiningInfo = [];
          //sending join info
          this.joiningInfo.push(this.currUser.firstName);
          this.joiningInfo.push(this.currentModStr);
          this.joinRoom(this.joiningInfo);
  }
    );
  }

  ngOnDestroy() {
    // this.socket.emit('leave-all', this.currUser.firstName);
  }

  ngAfterViewChecked() {}

  constructor(private route: ActivatedRoute, private userService: UsersService) {
    // initializing variables
    this.currentModStr = route.parent.params['module'];
    this.currUser = this.userService.getCurrentUser();
    this.currMembers = [];
    this.socket = io(this.localDomain);
    this.userService.setSocket(this.socket);

    //receiving messages
    this.socket.on('message', function(msg) {
      var msgArr = msg.split(' ');
      msgArr[0] = msgArr[0].bold();
      var newMsg = msgArr.join(' ');
      this.messages.push(newMsg);
    }.bind(this));

    //receiving user joined message
    this.socket.on('joined-message', function(joinedMsg) {
      // this.messages.push(joinedMsg.italics());
      this.messages.push(joinedMsg.italics());
    }.bind(this));

    //receiving user left message
    this.socket.on('user-left', function(leavingInfo) {
      var index = this.currMembers.indexOf(leavingInfo);
      this.currMembers.splice(index, 1);
      var str = leavingInfo + ' has left room: ' + this.currentModStr;
      this.messages.push(str.italics());
    }.bind(this));

    // receiving room info
    this.socket.on('room-info', function(roomInfo) {
      this.currMembers = roomInfo;
      console.log(roomInfo);
    }.bind(this));
  }

  // join room, called on init
  joinRoom(joiningInfo: string[]) {
    this.socket.emit('subscribe', joiningInfo);
  }

  // emit message
  sendNewMessage() {
    this.newMsg = this.currUser.firstName + ': ' + this.typedMessage;
    this.socket.emit('new message', this.newMsg);
    this.socket.emit('send', {room: this.currentModStr, message: this.newMsg});
    this.typedMessage = '';
  }

  enterClicked() {
    this.newMsg = this.currUser.firstName + ': ' + this.typedMessage;
    this.socket.emit('new message', this.newMsg);
    this.socket.emit('send', {room: this.currentModStr, message: this.newMsg});
    this.typedMessage = '';
  }
}
