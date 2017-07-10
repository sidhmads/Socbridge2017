import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {DescriptionService} from '../Description.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  data: object[];
  currentMod;
  semesters = [];
  workloads = [];
  examDates = ['', '', '', '' ];
  CORS_web = '';
  IVLE_web = '';
  NUSMODS_web = '';
  constructor(private http: Http,
              private descriptionService: DescriptionService,
              private route: ActivatedRoute) {
    this.data = this.descriptionService.data;
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.currentMod = this.descriptionService.getModDescription(params['module']);
        }
      );
  }

  ngOnInit() {
        for (const i of this.currentMod['History']) {
          this.semesters.push(i['Semester']);
          if (i['ExamDate']) {
            this.examDates[i['Semester'] - 1] = i['ExamDate'];
          } else {
            this.examDates[i['Semester'] - 1] = 'No Exam';
          };
        };
        this.semesters.sort();
        this.workloads = this.currentMod['Workload'].split('-');
        this.CORS_web = 'https://myaces.nus.edu.sg/cors/jsp/report/ModuleDetailedInfo.jsp?acad_y=2017/2018sem_c=1&mod_c=' + this.currentMod['ModuleCode'];
        this.IVLE_web = 'http://ivle.nus.edu.sg/lms/public/list_course_public.aspx?code=' + this.currentMod['ModuleCode'];
        this.NUSMODS_web = 'https://nusmods.com/modules/'  + this.currentMod['ModuleCode'];
      }


}
