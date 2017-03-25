import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Classes } from '../../../../both/collections/classes.collection'
import { Class } from '../../../../both/models/class.model'
import template from './classes-list.component.html'

@Component({
  selector: 'classes-list',
  template,
})

export class ClassesListComponent implements OnInit, OnDestroy {

  classes: Observable<Class[]>;
  classesSub: Subscription;

  ngOnInit() {
    this.classes = Classes.find({}).zone();
    this.classesSub = MeteorObservable.subscribe('classes').subscribe();
  }

  ngOnDestroy() {
    if (!! this.classesSub) {
      this.classesSub.unsubscribe();
    }
  }
}
