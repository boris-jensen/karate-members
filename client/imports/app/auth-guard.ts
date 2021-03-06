import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../../imports/client/services/users.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.getCurrentUser().isSome) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false
    }
  }
}
