import {Component, Injector, OnInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/User.model';
import { UsersService } from '../../Users.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  currentUser: User = new User('test', 'test', 'test', 'test', 5, ['test', 'test2'], []);

  constructor(private route: ActivatedRoute, private userService: UsersService) {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.currentUser = this.userService.getUserByName(params['firstName']);
        }
      );
  }
  ngOnInit() {}
}
