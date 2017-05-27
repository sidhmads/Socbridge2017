import { User } from './User.model';

export class Course {
  public name: string;
  public users1: User[];
  public users2: User[];
  public  users3: User[];
  public  users4: User[];

  constructor(name: string, userArr: User[]) {
    this.name = name;
     for (const u of userArr) {
       if (u.yearOfStudy === 1) {
          this.users1.push(u);
        }
       if (u.yearOfStudy === 2) {
         this.users2.push(u);
       }
       if (u.yearOfStudy === 3) {
         this.users3.push(u);
       }
       if (u.yearOfStudy === 4) {
         this.users4.push(u);
       }
     }
  }
  addUser(user: User) {
    if (user.yearOfStudy === 1 ) {
      this.users1.push(user);
    }  else if  (user.yearOfStudy === 2 ) {
      this.users2.push(user);
    } else if  (user.yearOfStudy === 3 ) {
      this.users3.push(user);
    } else if  (user.yearOfStudy === 4 ) {
      this.users4.push(user);
    }
  }
}
