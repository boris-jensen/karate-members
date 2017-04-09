import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (Meteor.userId()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false
    }
  }
}
