import { Meteor } from 'meteor/meteor';
import { Students } from '../../both/collections/students.collection';

Meteor.publish('students', function() {
  return Students.find({});
//  return Students.find(buildQuery.call(this));
});

Meteor.publish('student', function(studentId: string) {
  return Students.find(buildQuery.call(this, studentId));
});

function buildQuery(studentId?: string): Object {

  const isAvailable = { _id: {$exists: true} }
/*  const isAvailable = {
    $or: [{
      // party is public
      public: true
    },
    // or
    { 
      // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  }; */

  if (studentId) {
    return {
      // only single party
      $and: [{
          _id: studentId
        },
        isAvailable
      ]
    };
  }

  return isAvailable;
}