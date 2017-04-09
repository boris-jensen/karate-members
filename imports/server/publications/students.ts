import { Meteor } from 'meteor/meteor';
import { Students } from '../../both/collections/students.collection';

Meteor.publish('students', function() {
  return (!!this.userId) ? Students.find({}) : []
});

Meteor.publish('student', function(studentId: string) {
  return (!!this.userId && !!studentId) ? Students.find({ _id: studentId }) : []
});
