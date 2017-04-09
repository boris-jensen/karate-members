import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs/Rx';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { Option, None, Some } from 'option-t';

import { Roles } from 'meteor/alanning:roles'
import { KarateRoles } from '../../../imports/both/permissions/roles'

@Injectable()
export class UserService {

  private user: BehaviorSubject<Option<Meteor.User>>

  constructor(private router: Router) {
    this.user = new BehaviorSubject<Option<Meteor.User>>(new None())
  }

  signIn(username: string, password: string): void {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
          console.log(error);
      } else {
        this.user.next(new Some(Meteor.user()))
        this.router.navigate(['/'])
      }
    });
  }

  signOut(): void {
    const logout = Observable.of(Meteor.logout());
    logout.subscribe(
        () => {
          this.user.next(new None())
          this.router.navigate(['/sign-in'])
        },
        error => console.log(error)
    );
  }

  userStream(): Observable<Option<Meteor.User>> {
    return this.user
  }
}
