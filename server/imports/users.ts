export function ensureUsers() {

  const borisMail = 'boris_jensen@hotmail.com'

  const adminName = 'admin'
  if (! Accounts.findUserByUsername(adminName)) {
    Accounts.createUser({username: adminName, email: borisMail, password: 'hikitehikiashi'})
  }

  const teacherName = 'instruktør'
  if (! Accounts.findUserByUsername(teacherName)) {
    Accounts.createUser({username: teacherName, email: borisMail + '-fake1', password: 'hikite'})
  }

  const accountantName = 'kasserer'
  if (! Accounts.findUserByUsername(accountantName)) {
    Accounts.createUser({username: accountantName, email: borisMail + '-fake2', password: 'bjarne'})
  }
}
