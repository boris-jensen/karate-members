import { Students } from '../../both/collections/students.collection';
import { Student } from '../../both/models/student.model'

export function loadStudents() {
  if (Students.find().cursor.count() === 0) {
    const students: Student[] = [
      {
        name: 'Jonas Min Holm',
        classes: ['5', '6', '7'],
        sessions: [{ class: '5', date: '1. oktober'}, {class: '5', date: '8. oktober'}, {class: '6', date: '3. oktober'}, {class: '6', date: '10. oktober'}, {class: '7', date: '7. oktober'}],
        hasPaid: true,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
      {
        name: 'Marie Karkov',
        classes: ['5', '6'],
        sessions: [{ class: '5', date: '1. oktober'}, {class: '5', date: '8. oktober'}, {class: '6', date: '3. oktober'}, {class: '6', date: '10. oktober'}],
        hasPaid: false,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
      {
        name: 'Maria Lillistone',
        classes: ['3'],
        sessions: [{ class: '3', date: '1. oktober'}, {class: '3', date: '8. oktober'}],
        hasPaid: false,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
      {
        name: 'Lasse Luttermann',
        classes: ['3', '4'],
        sessions: [{ class: '3', date: '1. oktober'}, {class: '3', date: '8. oktober'}, {class: '4', date: '3. oktober'}, {class: '4', date: '10. oktober'}],
        hasPaid: true,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
      {
        name: 'Emil Tonnesen',
        classes: ['1', '2'],
        sessions: [{ class: '1', date: '30. september'}, {class: '1', date: '7. oktober'}, {class: '2', date: '3. oktober'}, {class: '2', date: '10. oktober'}],
        hasPaid: false,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
      {
        name: 'Valdemar Brinck',
        classes: ['1', '2'],
        sessions: [{ class: '1', date: '30. september'}, {class: '1', date: '7. oktober'}, {class: '2', date: '3. oktober'}, {class: '2', date: '10. oktober'}],
        hasPaid: true,
        contacts: [{name: 'Boris Jensen', phone: '28927422', email: 'boris_jensen@hotmail.com'}],
        birthdate: '20-05-2016',
        active: true
      },
    ];
 
    students.forEach((student) => Students.insert(student));
  }
}