import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()

export class DescriptionService {
  NUSMODS;
  data;
  ModsTaken = [];
  requiredData = [];
  constructor(private http: Http) {};
  getData() {
    this.NUSMODS = this.http.get('http://api.nusmods.com/2017-2018/moduleInformation.json');
    this.NUSMODS.subscribe(
      (response) => {
        this.data = JSON.parse(response['_body']);
      },
      (error) => console.log(error)
  );
  }
  compute() {
    for (var i = 0; i < this.data.length; i++) {
      if (this.ModsTaken.indexOf(this.data[i]['ModuleCode']) >  -1 ) {
        this.requiredData.push(this.data[i]);
      }
    }
  }
  getModDescription(modName: string) {
    for (const i of this.requiredData) {
      if (i['ModuleCode'] === modName) {
        return i;
      }
    }
  }

}
