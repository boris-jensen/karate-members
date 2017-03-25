import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';
import { Classes } from '../../../../both/collections/classes.collection';
import { Class } from '../../../../both/models/class.model'

import template from './student-details.component.html'

@Component({
  selector: 'student-details',
  template
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  sessions: string[]
  studentId: string;
  student: Student;
  classes: Observable<Class[]>
  studentSub: Subscription;
  paramsSub: Subscription;
  classesSub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['studentId'])
      .subscribe(partyId => {
        this.studentId = partyId;
        
        if (this.studentSub) {
          this.studentSub.unsubscribe();
        }

        if (this.classesSub) {
          this.classesSub.unsubscribe();
        }

        this.studentSub = MeteorObservable.subscribe('student', this.studentId).subscribe(() => {
          this.student = Students.findOne(this.studentId);
          this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
            this.classes = Classes.find({_id: {$in: this.student.classes}});
            this.sessions = this.student.sessions.map(session => Classes.findOne(session.class).name + ' den ' + session.date)
          });
        });
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.classesSub.unsubscribe();
    this.studentSub.unsubscribe();
  }

/*

  saveParty() {
    if (!Meteor.userId()) {
      alert('Please log in to change this party');
      return;
    }
    
    Parties.update(this.party._id, {
      $set: {
        name: this.party.name,
        description: this.party.description,
        location: this.party.location
      }
    });
  }
*/
  
}
