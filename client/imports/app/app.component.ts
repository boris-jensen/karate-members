import { Component } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Roles } from 'meteor/alanning:roles'
import { Option, None, Some } from 'option-t';
import { UserService } from '../../../imports/client/services/users.service'
import { KarateRoles } from '../../../imports/both/permissions/roles'
import template from './app.component.html'

@Component({
  selector: 'app',
  template
})
export class AppComponent {

  loggedIn: Observable<boolean>
  username: Observable<string>
  canSetPayments: Observable<boolean>
  canViewEmails: Observable<boolean>
  canManageUsers: Observable<boolean>

  constructor(private userService: UserService) { 
    const user = this.userService.userStream()
    this.loggedIn = user.map(user => user.isSome ? true : false)
    this.username = user.map(user => user.isSome ? user.unwrap().username : '')
    this.canSetPayments = user.map(user => user.isSome ? Roles.userIsInRole(user.unwrap()._id, KarateRoles.setPayments) : false)
    this.canViewEmails = user.map(user => user.isSome ? Roles.userIsInRole(user.unwrap()._id, KarateRoles.viewEmails) : false)
    this.canManageUsers = user.map(user => user.isSome ? Roles.userIsInRole(user.unwrap()._id, KarateRoles.manageUsers) : false)
  }

  logout(): void {
    this.userService.signOut()
  }
}
