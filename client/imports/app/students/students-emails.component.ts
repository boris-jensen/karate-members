import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Student } from '../../../../both/models/student.model'
import { Students } from '../../../../both/collections/students.collection' 
import { Class } from '../../../../both/models/class.model'
import { Classes } from '../../../../both/collections/classes.collection'
import * as moment from 'moment'

import template from './students-emails.component.html'

@Component({
  selector: 'class-attendance',
  template
})

export class StudentsEmailsComponent implements OnInit {

  studentsSub: Subscription;
  students: Observable<Student[]>
  selectedStudents: Subject<String[]>
  emails: Observable<String>
  checkedForm: FormGroup
/*  classes: Observable<Class[]>;
  classesSub: Subscription;
  paid: Subject<boolean>
  unpaid: Subject<boolean>
  classIds: Subject<String[]>
  paidForm: FormGroup
  classesForm: FormGroup */

  constructor(private formBuilder: FormBuilder) { }

  makeCheckedForm(student: Student): FormGroup {
    return this.formBuilder.group({
      checked: false,
      name: student.name,
      id: student._id
    })
  }

  ngOnInit() {
    this.selectedStudents = new Subject<String[]>()
    this.selectedStudents.subscribe(ss => console.log(ss))
//    this.classIds = new Subject<String[]>()
  //  this.classIds.subscribe(cs => console.log(cs))
    //this.paid = new Subject<boolean>()
//    this.unpaid = new Subject<boolean>()
    this.emails = new Subject<String>()
    this.students = Students.find().zone();
    this.students.subscribe(ss => console.log(ss))

/*    this.classes = Classes.find({}).zone();
    this.classesSub = MeteorObservable.subscribe('classes').subscribe();

    this.classesForm = this.formBuilder.group({
      classes: [[], Validators.required],
    });
    this.classesForm.valueChanges.subscribe(val => this.classIds.next(val.classes))
    

    this.paidForm = this.formBuilder.group({
      paid: [true, Validators.required],
      unpaid: [true, Validators.required]
    })

    this.paidForm.valueChanges.subscribe(value => this.paid.next(value.paid))
    this.paidForm.valueChanges.subscribe(value => this.unpaid.next(value.unpaid))

    this.paid.subscribe(p => console.log(p))
    this.unpaid.subscribe(u => console.log(u))
    this.classIds.subscribe(cs => console.log(cs))
    this.emails = this.students
      .combineLatest(this.selectedStudents, this.paid, this.unpaid, this.classIds, 
        (students, selected, paid, unpaid, classIds) => this.makeEmails(students, selected, paid, unpaid, classIds)) */

    this.emails = this.students
      .combineLatest(this.selectedStudents, 
        (students, selectedStudents) => this.makeEmails(students, selectedStudents))
    
    this.studentsSub = MeteorObservable.subscribe('students').subscribe(() => {
      this.students.subscribe(studs => {
        this.checkedForm = this.formBuilder.group({
          selected: this.formBuilder.array(
            studs.map(stud => this.makeCheckedForm(stud))
          )
        });
        this.checkedForm.valueChanges.subscribe(value => this.selectedStudents.next(value.selected.filter(val => val.checked).map(val => val.id)))
      })
    });

//    this.classIds.next(['1', '2', '3', '4', '5', '6', '7'])
  //  this.paid.next(true)
    //this.unpaid.next(true)
    this.selectedStudents.next([])
  }

  ngOnDestroy() {
    if (!! this.studentsSub) {
      this.studentsSub.unsubscribe();
    }
  }

  makeEmails(students: Student[], selected: String[]): String {
    console.log('making emails')
    const nestedMails: String[][] = students
      .filter(student => selected.indexOf(student._id) >= 0)
      .map(student => student.contacts.map(contact => contact.email))

    console.log(nestedMails)
    const mails: String[] = [].concat.apply([], nestedMails)
    console.log(mails)
    return mails.join(';')
  }

/*
  makeEmails(students: Student[], selected: String[], paid: boolean, unpaid: boolean, classes: String[]): String {
    console.log('making emails')
    const nestedMails: String[][] = students
      .filter(student => {
        true})
      .map(student => student.contacts.map(contact => contact.email))
    const mails: String[] = [].concat.apply([], nestedMails)
    return mails.join(';')
  } */
}
