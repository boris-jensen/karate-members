import { Meteor } from 'meteor/meteor';
import { Classes } from '../../both/collections/classes.collection';

Meteor.publish('classes', function() {
  return (!!this.userId) ? Classes.find({}) : []
});

Meteor.publish('class', function(classId: string) {
  return (!!this.userId && !!classId) ? Classes.find({ _id: classId }) : []
})
