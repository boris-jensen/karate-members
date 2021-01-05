import { Meteor } from 'meteor/meteor';

import { loadStudents } from '../imports/server/fixtures/students';
import { loadClasses } from '../imports/server/fixtures/classes';
import { loadUsers } from '../imports/server/fixtures/users';

import '../imports/server/publications/students';
import '../imports/server/publications/classes';

import '../imports/both/methods/mail'


Meteor.startup(() => {
  loadClasses();
  loadStudents(); 
  loadUsers();
});
