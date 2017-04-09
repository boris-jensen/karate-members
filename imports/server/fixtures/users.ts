import { KarateRoles } from '../../both/permissions/roles'
import { Roles } from 'meteor/alanning:roles';

export function loadUsers() {

  const allRoles = [
    KarateRoles.setPayments,
    KarateRoles.viewEmails,
    KarateRoles.manageUsers
  ]

  const adminName = 'admin'
  const adminMail = 'boris_jensen@hotmail.com'
  if (! Accounts.findUserByUsername(adminName)) {
    const adminId = Accounts.createUser({username: adminName, email: adminMail, password: 'hikitehikiashi'})
    Roles.addUsersToRoles(adminId, allRoles)
  }

  const teacherName = 'instruktør'
  const teacherMail = 'boris@esbjerg-karate.dk'
  if (! Accounts.findUserByUsername(teacherName)) {
    const teacherId = Accounts.createUser({username: teacherName, email: teacherMail, password: 'hikite'})
    Roles.addUsersToRoles(teacherId, [])
  }

  const accountantName = 'kasserer'
  const accountantMail = 'kasserer@esbjerg-karate.dk'
  if (! Accounts.findUserByUsername(accountantName)) {
    const accountantId = Accounts.createUser({username: accountantName, email: accountantMail, password: 'bjarne'})
    Roles.addUsersToRoles(accountantId, allRoles)
  }
}
