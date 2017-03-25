import { Meteor } from 'meteor/meteor';

import { loadParties } from './imports/fixtures/parties';
import { loadStudents } from './imports/fixtures/students';
import { loadClasses } from './imports/fixtures/classes';

import './imports/publications/parties'; 

Meteor.startup(() => {
  loadParties();
  loadClasses();
  loadStudents();
});
