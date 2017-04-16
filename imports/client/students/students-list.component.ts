import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Student } from '../../both/models/student.model'
import { Students } from '../../both/collections/students.collection' 
import template from './students-list.component.html'

@Component({
  selector: 'students-list',
  template
})
export class StudentsListComponent implements OnInit, OnDestroy {

  students: Observable<Student[]>;
  studentsSub: Subscription;

  ngOnInit() {
    this.students = Students.find({ active: true }, {sort: {name: 1}}).zone();
    this.studentsSub = MeteorObservable.subscribe('students').subscribe();
  }

  ngOnDestroy() {
    if (!! this.studentsSub) {
      this.studentsSub.unsubscribe();
    }
  }
}
