import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  courses = ['CS1010', 'CS1020', 'CS1231', 'MA1505', 'MA1506']
  constructor() { }

  ngOnInit() {
  }

}
