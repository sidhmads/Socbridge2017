import {uuid} from '../util/uuid';

export class User {
  public firstName: string;
  public lastName: string;
  public id: string;
  public imagePath: string;
  public course: string;
  public yearOfStudy: number;
  public modules: string[];
  public friendList: string[];

  constructor(firstName: string, lastName: string, imagePath: string, faculty: string,
              yearOfStudy: number, courses: string[], friendList: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.imagePath = imagePath;
    this.course = faculty;
    this.yearOfStudy = yearOfStudy;
    this.modules = courses;
    this.friendList = friendList;
    this.id = uuid();
  }
}
