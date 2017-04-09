import { Classes } from '../../both/collections/classes.collection';
import { Class } from '../../both/models/class.model'

export function loadClasses() {
  if (Classes.find().cursor.count() === 0) {
    const classes: Class[] = [
      {
        name: 'Børnehold mandag',
        _id: '1'
      },
      {
        name: 'Børnehold torsdag',
        _id: '2'
      },
      {
        name: 'Juniorhold tirsdag',
        _id: '3'
      },
      {
        name: 'Juniorhold torsdag',
        _id: '4'
      },
      {
        name: 'Seniorhold tirsdag',
        _id: '5'
      },
      {
        name: 'Seniorhold torsdag',
        _id: '6'
      },
      {
        name: 'Kamphold mandag',
        _id: '7'
      },
    ];
 
    classes.forEach((klass) => Classes.insert(klass));
  }
}
