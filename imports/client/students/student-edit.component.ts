import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Student } from '../../both/models/student.model'
import { Students } from '../../both/collections/students.collection' 
import { Contact } from '../../both/models/contact.model'
import { Class } from '../../both/models/class.model'
import { Classes } from '../../both/collections/classes.collection'
import * as moment from 'moment'

import template from './student-edit.component.html'

@Component({
  selector: 'student-edit',
  template
})
export class StudentEditComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  studentId: string;
  student: Student;
  classes: Observable<Class[]>
  studentSub: Subscription;
  paramsSub: Subscription;
  classesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.classes = Classes.find({}).zone();
    this.classesSub = MeteorObservable.subscribe('classes').subscribe();
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      classes: [[], Validators.required],
      birthdate: [moment().format('DD-MM-YYYY'), Validators.required],
      contacts: this.formBuilder.array([
      ])
    });
    this.paramsSub = this.route.params
      .map(params => params['studentId'])
      .subscribe(studentId => {
        this.studentId = studentId;

        if (this.studentSub) {
          this.studentSub.unsubscribe();
        }

        if (this.classesSub) {
          this.classesSub.unsubscribe();
        }
        this.studentSub = MeteorObservable.subscribe('student', this.studentId).subscribe(() => {
          this.student = Students.findOne(this.studentId);
          this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
            this.editForm.patchValue({name: this.student.name, birthdate: this.student.birthdate, classes: this.student.classes})
            this.student.contacts.forEach(contact => {
              (<FormArray>this.editForm.get('contacts')).push(this.makeContactForm(contact))
            })
          })
        })
      })
  }

  makeContactForm(contact: Contact): FormGroup {
    return this.formBuilder.group({
      name: [contact.name, Validators.required],
      phone: [contact.phone, Validators.required],
      email: [contact.email, Validators.required]
    })
  }

  makeEmptyContactForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    if (!! this.classesSub) {
      this.classesSub.unsubscribe()
    }
    if (!! this.studentSub) {
      this.studentSub.unsubscribe()
    }
    if (!! this.paramsSub) {
      this.paramsSub.unsubscribe()
    }
  }

  removeContact(index: number){
    (<FormArray>this.editForm.get('contacts')).removeAt(index);
  }

  onAddContact() {
    (<FormArray>this.editForm.get('contacts')).push(this.makeEmptyContactForm())
  }

  edit() {
    if (!Meteor.userId()) {
      alert('Please log in to add a student');
      return;
    }

    if (this.editForm.valid) {
      const values = this.editForm.value
      Students.update(this.studentId, {
        $set: {
          name: values.name,
          birthdate: values.birthdate,
          classes: values.classes,
          contacts: values.contacts
        }
      });
      this.editForm.reset();
      this.router.navigate(['/students/' + this.studentId]);
    }
    else {
      console.log('Errors')
    }
  }
}
