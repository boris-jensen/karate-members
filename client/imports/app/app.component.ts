import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Roles } from 'meteor/alanning:roles'
import { Option, None, Some } from 'option-t'
import { Router } from '@angular/router'
import { UserService } from '../../../imports/client/services/users.service'
import { KarateRoles } from '../../../imports/both/permissions/roles'
import template from './app.component.html'

@Component({
  selector: 'app',
  template
})
export class AppComponent implements OnInit {

  loggedIn: Observable<boolean>
  username: Observable<string>
  canSetPayments: Observable<boolean>
  canViewEmails: Observable<boolean>
  canManageUsers: Observable<boolean>

  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private router: Router) { }

  isLoggedIn: boolean

  ngOnInit() {
    const self = this
    const user = this.userService.getUserStream()
    this.loggedIn = user.map(user => user.isSome)
    this.username = user.map(user => user.map(u => u.username).unwrapOr(''))
    this.canSetPayments = user.map(this.hasRole(KarateRoles.setPayments))
    this.canViewEmails = user.map(this.hasRole(KarateRoles.viewEmails))
    this.canManageUsers = user.map(this.hasRole(KarateRoles.manageUsers))
    this.router.events.subscribe(x => self.cdr.detectChanges())
  }

  logout(): void {
    this.userService.signOut()
  }

  private hasRole(role: String): (user: Option<Meteor.User>) => boolean {
    return user => user.map(u => Roles.userIsInRole(u._id, role)).unwrapOr(false)
  }
}
