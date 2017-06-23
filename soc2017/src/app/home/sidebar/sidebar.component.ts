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

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private httpService: HttpService,
              private router: Router) {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.currentUser = this.userService.getUserByName(params['firstName']);
    //     }
    //   );
    // this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {}
  logout() {
    this.httpService.signOut();
    this.router.navigate(['/']);
    this.userService.signOut();  }

}
