import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Student } from '../../both/models/student.model'
import { Students } from '../../both/collections/students.collection' 
import { Class } from '../../both/models/class.model'
import { Classes } from '../../both/collections/classes.collection'
import * as moment from 'moment'

import template from './students-emails.component.html'

@Component({
  selector: 'class-attendance',
  template
})

export class StudentsEmailsComponent implements OnInit {

  studentsSub: Subscription;
  classesSub: Subscription;

  paidForm: FormGroup
  classesForm: FormGroup
  checkedForm: FormGroup

  students: Observable<Student[]>
  classes: Observable<Class[]>;

  keepPaidFilters: Observable<boolean>
  keepUnpaidFilters: Observable<boolean>
  keepClassIdFilters: Observable<String[]>

  filteredStudents: Observable<Student[]>
  selectedStudents: Observable<String[]>
  emails: Observable<String>

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paidForm = this.formBuilder.group({
      paid: [true, Validators.required],
      unpaid: [true, Validators.required]
    })
    this.keepPaidFilters = this.paidForm.valueChanges.startWith(this.paidForm.value).map(value => value.paid)
    this.keepUnpaidFilters = this.paidForm.valueChanges.startWith(this.paidForm.value).map(value => value.unpaid)

    this.classes = Classes.find({}).zone();
    this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
      this.classesForm = this.formBuilder.group({
        classes: [[], Validators.required],
      });
      this.keepClassIdFilters = this.classesForm.valueChanges.startWith(this.classesForm.value).map(value => value.classes)

      this.students = Students.find().zone();
      this.checkedForm = this.formBuilder.group({
        selected: this.formBuilder.array([])
      });
      
      this.studentsSub = MeteorObservable.subscribe('students').subscribe(() => {
        this.filteredStudents = this.students.combineLatest(this.keepPaidFilters, this.keepUnpaidFilters, this.keepClassIdFilters, this.filterStudents)
        this.filteredStudents.subscribe(studs => {
          const arr = (<FormArray>this.checkedForm.get('selected'))
          while(arr.length > 0) {
            arr.removeAt(0)
          }
          this.makeCheckedForms.bind(this)(studs).forEach((form: FormGroup) => arr.push(form))
        })
        this.selectedStudents = this.checkedForm.valueChanges.startWith(this.checkedForm.value).map(this.makeSelected)
        this.emails = this.filteredStudents.combineLatest(this.selectedStudents, this.makeEmails)
      })
    })
  }

  ngOnDestroy() {
    if (!! this.studentsSub) {
      this.studentsSub.unsubscribe();
    }

    if (!! this.classesSub) {
      this.classesSub.unsubscribe();
    }
  }

  filterStudents(students: Student[], keepPaid: boolean, keepUnpaid: boolean, keepClassIds: String[]): Student[] {
    const arrayContains = function(array: String[], pred: (String) => boolean): boolean {
      return array.findIndex(pred) > -1
    }

    return students.filter(student => {
      const studentHasClassInKeepClasses = arrayContains(
        student.classes, 
        (classId: String) => arrayContains(
          keepClassIds, 
          (keepId: String) => classId === keepId))
      const keepAllStudents = keepClassIds.length === 0
      const keepForClass = keepAllStudents || studentHasClassInKeepClasses
      const keepForPaid = student.hasPaid ? keepPaid : keepUnpaid
      return keepForClass && keepForPaid
    })
  }

  makeEmails(students: Student[], selected: String[]): String {
    const nestedMails: String[][] = students
      .filter(student => selected.indexOf(student._id) >= 0)
      .map(student => student.contacts.map(contact => contact.email))

    const mails: String[] = [].concat.apply([], nestedMails)
    return mails.join(';')
  }

  makeCheckedForms(students: Student[]): FormGroup[] {
    return students.map(student => 
      this.formBuilder.group({
        checked: true,
        name: student.name,
        id: student._id
      })
    )
  }

  makeSelected(value: {selected: {checked: boolean, name: String, id: String}[]}): String[] {
    return value.selected.filter(val => val.checked).map(val => val.id)
  }
}
