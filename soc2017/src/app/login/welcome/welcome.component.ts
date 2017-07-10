import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  localHostStr = 'localhost:4200';
  herokuDomainStr = 'socbridge.herokuapp.com';
  constructor() { }

  ngOnInit() {
  }

}
