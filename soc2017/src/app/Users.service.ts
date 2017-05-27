

import {User} from "./models/User.model";
import {Module} from "./models/Module.model";
import {Course} from "./models/Course.model";

export class UsersService {
  private byModule: Module[] = [];
  private temp: Module[] = [];
  private byCourse: Course[] = [];
  private Users: User[] = [];

  private courseAdded = false;
  private facultyAdded = false;
  private yearAdded = false;

  getUsers() {
    return this.Users;
  }

  addUser(user: User) {
    this.Users.push(user);
    this.temp = [];
    for (const x of user.courses) {
      for (const i of this.byCourse) {
        if (x === i.moduleName) {
          i.users.push(user);
          this.courseAdded = true;
          break;
        }
      }
      if (!this.courseAdded) {
        this.temp.push(new CourseModel(x, [user]));
      }
      this.courseAdded = false;
    }
    this.byCourse.push(...this.temp);
    // for byFaculty && byYear
    for (const x of this.byFaculty) {
      if (user.faculty === x.faculty) {
        x.users.push(user);
        this.facultyAdded = true;
        break;
      }
      for (const yr of x.byYear) {
        if (user.yearOfStudy === yr.year) {
          yr.users.push(user);
          this.yearAdded = true;
          break;
        }
      }
      if (!this.yearAdded) {
        x.byYear.push(new YearModel(user.yearOfStudy, [user]));
      }
    }
    if (!this.facultyAdded) {
      this.byFaculty.push(new FacultyModel(user.faculty, [user]));
    }
    this.facultyAdded = false;
    this.yearAdded = false;
  }
  // to get the user object
  getUserByName(firstName: string, lastName: string) {
    for (const i of this.Users) {
      if (i.firstName === firstName && i.lastName === lastName ) {
        return i;
      }
    }
    return null;
  }
  // to get the courses objects the user takes
  getUserCourses(user: User) {
    const courseTaken: CourseModel[] = [];
    for (const course of user.courses) {
      for (const obj of this.byCourse) {
        if (course === obj.courseName) {
          courseTaken.push(obj);
        }
      }
    }
    return courseTaken;
  }
  getFaculty(user: User) {
    for (const fac of this.byFaculty) {
      if (fac.faculty === user.faculty) {
        return fac;
      }
    }
  }

  getModuleByName(module: string) {
    for (let mod of this.byCourse) {
      if (mod.courseName === module) {
        return mod;
      }
    }
    return null;
  }
}
