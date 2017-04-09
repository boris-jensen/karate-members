import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Student } from '../../both/models/student.model'
import { Students } from '../../both/collections/students.collection' 
import { Class } from '../../both/models/class.model'
import { Classes } from '../../both/collections/classes.collection'
import * as moment from 'moment'

import template from './class-attendance.component.html'

@Component({
  selector: 'class-attendance',
  template
})

export class ClassAttendanceComponent implements OnInit {

  studentsSub: Subscription;
  paramsSub: Subscription;
  classSub: Subscription;
  students: Observable<Student[]>
  date: string
  classId: string
  klass: Class
  attendanceForm: FormGroup

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  makeAttendanceForm(student: Student): FormGroup {
    return this.formBuilder.group({
      present: false,
      name: student.name,
      hasPaid: student.hasPaid,
      id: student._id
    })
  }

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
            this.students.subscribe(studs => {
              this.attendanceForm = this.formBuilder.group({
                date: [moment().format('DD-MM-YYYY'), Validators.required],
                attendees: this.formBuilder.array(
                  studs.map(stud => this.makeAttendanceForm(stud))
                )
              });
            })
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

  takeAttendance() {
    const date = this.attendanceForm.value.date
    const attendeeIds = this.attendanceForm.value.attendees.filter(student => student.present).map(student => student.id)
    attendeeIds.forEach((id) => {
      Students.update(id, { $push: { sessions: { class: this.classId, date: date } } })
    })
    this.router.navigate(['/classes'])
  }
}
