import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  currentModStr = this.route.parent.snapshot.params['module'];
  ngOnInit() {
  }

}
