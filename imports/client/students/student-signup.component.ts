import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Student } from '../../both/models/student.model'
import { Students } from '../../both/collections/students.collection' 
import { Class } from '../../both/models/class.model'
import { Classes } from '../../both/collections/classes.collection'
import * as moment from 'moment'

import template from './student-signup.component.html'

@Component({
  selector: 'student-signup',
  template
})
export class StudentSignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  classes: Observable<Class[]>;
  classesSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.classes = Classes.find({}).zone();
    this.classesSub = MeteorObservable.subscribe('classes').subscribe();
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      classes: [[], Validators.required],
      birthdate: [moment().format('DD-MM-YYYY'), Validators.required],
      contacts: this.formBuilder.array([
        this.makeContactForm()
      ])
    });
  }

  ngOnDestroy() {
    if (!! this.classesSub) {
      this.classesSub.unsubscribe()
    }
  }

  removeContact(index: number){
    (<FormArray>this.signupForm.get('contacts')).removeAt(index);
  }

  onAddContact() {
    (<FormArray>this.signupForm.get('contacts')).push(this.makeContactForm())
  }

  makeContactForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  signup(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a student');
      return;
    }

    if (this.signupForm.valid) {
      const newStudent = Object.assign({}, this.signupForm.value, { sessions: [], hasPaid: false, active: true })
      Students.insert(newStudent);
      this.signupForm.reset();
      Meteor.call('sendSignupAcknowledgement', newStudent, (err) => {
        console.log(JSON.stringify(err))
      })
      this.router.navigate(['/students']);
    }
    else {
      console.log('Errors')
    }
  }
}
