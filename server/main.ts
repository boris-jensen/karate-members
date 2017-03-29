import { Meteor } from 'meteor/meteor';

import { loadStudents } from './imports/fixtures/students';
import { loadClasses } from './imports/fixtures/classes';

import './imports/publications/students';
import './imports/publications/classes';

Meteor.startup(() => {
  loadClasses();
  loadStudents();
});
