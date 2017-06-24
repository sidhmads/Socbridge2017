export class User {
  public firstName: string;
  public lastName: string;
  public imagePath: string;
  public course: string;
  public yearOfStudy: number;
  public modules: string[];
  public friendList: string[];
  public email: string;
  public password: string;




  constructor(firstName: string, lastName: string, imagePath: string, faculty: string,
              yearOfStudy: number, courses: string[], friendList: string[], email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.imagePath = imagePath;
    this.course = faculty;
    this.yearOfStudy = yearOfStudy;
    this.modules = courses;
    this.friendList = friendList;
    this.email = email;
    this.password = password;

  }
}
