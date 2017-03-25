import { Meteor } from 'meteor/meteor';
import { Classes } from '../../../both/collections/classes.collection';
import { Student } from '../../../both/models/student.model';

Meteor.publish('classes', function() {
  if (!! this.userId) {
    return Classes.find(buildQuery.call(this));
  } else {
    return []
  }
});

Meteor.publish('class', function(classId: string) {
  return Classes.find(buildQuery.call(this, classId));
});

function buildQuery(classId?: string): Object {

  const isAvailable = {}
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
  };*/

  if (classId) {
    return {
      // only single party
      $and: [{
          _id: classId
        },
        isAvailable
      ]
    };
  }

  return isAvailable;
}