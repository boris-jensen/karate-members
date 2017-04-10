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

  private userStream: BehaviorSubject<Option<Meteor.User>>
  private currentUser: Option<Meteor.User>

  constructor(private router: Router) {
    const user = Meteor.user()
    this.currentUser = user ? new Some(user) : new None()
    this.userStream = new BehaviorSubject<Option<Meteor.User>>(this.currentUser)
  }

  signIn(username: string, password: string): void {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
          console.log(error);
      } else {
        this.currentUser = new Some(Meteor.user())
        this.userStream.next(this.currentUser)
        this.router.navigate(['/'])
      }
    });
  }

  signOut(): void {
    Meteor.logout((error) => {
      if (error) {
          console.log(error);
      } else {
        this.currentUser = new None()
        this.userStream.next(this.currentUser)
        this.router.navigate(['/sign-in'])
      }
    })
  }

  getUserStream(): Observable<Option<Meteor.User>> {
    return this.userStream
  }

  getCurrentUser(): Option<Meteor.User> {
    return this.currentUser
  }
}
