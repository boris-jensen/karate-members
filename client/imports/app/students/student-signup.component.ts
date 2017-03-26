import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Student } from '../../../../both/models/student.model'
import { Students } from '../../../../both/collections/students.collection' 
import { Class } from '../../../../both/models/class.model'
import { Classes } from '../../../../both/collections/classes.collection'
//import * as moment from 'moment'

import template from './student-signup.component.html'

@Component({
  selector: 'student-signup',
  template
})
export class StudentSignupComponent implements OnInit { //, OnDestroy {
  signupForm: FormGroup;
//  classes: Observable<Class[]>
  //classes: Observable<Class[]>;
//  classesSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
//    this.classes = Classes.find({}).zone();
  //  this.classesSub = MeteorObservable.subscribe('classes').subscribe();
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
//      classes: [],
  //    contacts: [{name: '', phone: '', email: ''}, Validators.required],
      birthdate: ['', Validators.required]
//      birthdate: [moment().format('DD-MM-YYYY'), Validators.required]
    });
//      contacts: [{name: '', phone: '', email: ''}],
//    }
  }

  addParty(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a student');
      return;
    }

    console.log('adding student')
    if (this.signupForm.valid) {
      const newStudent = Object.assign({}, this.signupForm.value, { sessions: [], hasPaid: false })
      console.log(newStudent)
//      Students.insert(newStudent);
      this.signupForm.reset();
//      this.call('sendSignupAcknowledgement', this.student, (err) => {
  //      console.log(JSON.stringify(err))
    //  })
      this.router.navigate(['/students']);
    }
  }
}
