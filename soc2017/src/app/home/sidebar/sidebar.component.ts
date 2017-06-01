import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../Users.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User = new User('test', 'test', 'test', 'test', 5, ['test', 'test2'], []);

  constructor(private route: ActivatedRoute, private userService: UsersService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentUser = this.userService.getUserByName(params['firstName']);
        }
      );
  }

  ngOnInit() {

  }

}
