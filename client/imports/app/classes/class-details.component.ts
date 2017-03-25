import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Classes } from '../../../../both/collections/classes.collection';
import { Class } from '../../../../both/models/class.model'
import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';
import template from './class-details.component.html'

@Component({
  selector: 'class-details',
  template
})
export class ClassDetailsComponent implements OnInit, OnDestroy {

  studentsSub: Subscription;
  paramsSub: Subscription;
  classSub: Subscription;
  students: Observable<Student[]>
  classId: string
  klass: Class

  constructor(private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['classId'])
      .subscribe(classId => {
        this.classId = classId;
        
        if (this.classSub) {
          this.classSub.unsubscribe();
        }

        if (this.studentsSub) {
          this.studentsSub.unsubscribe();
        }

        this.classSub = MeteorObservable.subscribe('class', this.classId).subscribe(() => {
          this.klass = Classes.findOne(this.classId);
          this.studentsSub = MeteorObservable.subscribe('students').subscribe(() => {
            this.students = Students.find({classes: {$all: [this.classId]}});
          });
        });
      });
  }

  ngOnDestroy() {
    if (!! this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if (!! this.classSub) {
      this.classSub.unsubscribe();
    }
    if (!! this.studentsSub) {
      this.studentsSub.unsubscribe();
    }
  }
}
