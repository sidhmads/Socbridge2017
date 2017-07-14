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

    //receiving messages
    this.socket.on('message', function(msg) {
      this.messages.push(msg);
    }.bind(this));

    //receiving user joined message
    this.socket.on('joined-message', function(joinedMsg) {
      this.messages.push(joinedMsg.italics());
    }.bind(this));

    //receiving user left message
    this.socket.on('left-message', function(joinedMsg) {
      this.messages.push(joinedMsg.italics());
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


  //
  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  //
  // chats: any;
  // joinned: boolean = false;
  // newUser = { nickname: '', room: '' };
  // msgData = { room: '', nickname: '', message: '' };
  // socket = io('http://localhost:4000');
  // currentModStr = this.route.parent.snapshot.params['module'];
  // constructor(private chatService: ChatService,
  //             private route: ActivatedRoute) {}
  //
  // ngOnInit() {
  //   // var user = JSON.parse(localStorage.getItem("user"));
  //   // if(user!==null) {
  //   //   this.getChatByRoom(user.room);
  //   //   this.msgData = { room: user.room, nickname: user.nickname, message: '' }
  //   //   this.joinned = true;
  //   //   this.scrollToBottom();
  //   // }
  //   this.socket.on('new-message', function (data) {
  //     if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
  //       this.chats.push(data.message);
  //       this.msgData = { room: user.room, nickname: user.nickname, message: '' }
  //       this.scrollToBottom();
  //     }
  //   }.bind(this));
  // }
  //
  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }
  //
  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch(err) { }
  // }
  //
  // getChatByRoom(room) {
  //   this.chatService.getChatByRoom(room).then((res) => {
  //     this.chats = res;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  //
  // joinRoom() {
  //   var date = new Date();
  //   localStorage.setItem("user", JSON.stringify(this.newUser));
  //   this.getChatByRoom(this.newUser.room);
  //   this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
  //   this.joinned = true;
  //   this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  // }
  //
  // sendMessage() {
  //   this.chatService.saveChat(this.msgData).then((result) => {
  //     this.socket.emit('save-message', result);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  //
  // logout() {
  //   var date = new Date();
  //   var user = JSON.parse(localStorage.getItem("user"));
  //   this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
  //   localStorage.removeItem("user");
  //   this.joinned = false;
  // }

}
