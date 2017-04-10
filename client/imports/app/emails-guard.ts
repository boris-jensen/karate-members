import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../../imports/client/services/users.service'
import { Roles } from 'meteor/alanning:roles'
import { KarateRoles } from '../../../imports/both/permissions/roles'

@Injectable()
export class EmailsGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    return this.userService.getCurrentUser().map(u => Roles.userIsInRole(u._id, KarateRoles.viewEmails)).unwrapOr(false)
  }
}
