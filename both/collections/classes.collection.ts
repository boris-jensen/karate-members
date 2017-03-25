import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Class } from '../models/class.model'

export const Classes = new MongoObservable.Collection<Class>('classes');

function loggedIn() {
  return !!Meteor.user();
}

Classes.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
