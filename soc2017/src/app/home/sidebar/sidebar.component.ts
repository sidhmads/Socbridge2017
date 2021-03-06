import {Component, OnChanges, OnInit} from '@angular/core';
import { User } from '../../models/User.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../Users.service';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User;

  constructor(public route: ActivatedRoute,
              public userService: UsersService,
              public httpService: HttpService,
              public router: Router) {
  }

  ngOnInit() {}
  logout() {
    this.userService.signOut();
    this.httpService.signOut();
    this.router.navigate(['/']);
  }

  onToggle(event) {
      event.clicked = true;
      this.userService.onToggle(event);
  }

  courseToggle() {
    this.userService.courseToggle();
  }

}
