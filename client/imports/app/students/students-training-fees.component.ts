import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Student } from '../../../../both/models/student.model'
import { Students } from '../../../../both/collections/students.collection' 
//import { Selectable } from '../../models/selectable.ts'
import template from './students-training-fees.component.html'

@Component({
  selector: 'students-training-fees',
  template
})

export class StudentsTrainingFeesComponent implements OnInit, OnDestroy {

  students: Observable<Student[]>
  studentsSub: Subscription

  constructor(private router: Router) {}

  ngOnInit() {
    this.students = Students.find({}).zone();
    this.studentsSub = MeteorObservable.subscribe('students').subscribe();
  }

  ngOnDestroy() {
    if (!! this.studentsSub) {
      this.studentsSub.unsubscribe();
    }
  }
 
  updatePayment(student: Student, event: any) {
    Students.update({ _id: student._id }, { $set: { hasPaid: event.target.checked }})
  }
}
