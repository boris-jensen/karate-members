import { Email } from 'meteor/email'
import { check } from 'meteor/check'
import { Student } from '../models/student.model'

Meteor.methods({
  sendSignupAcknowledgement: function (student: Student) {
    if (Meteor.isServer) {
      student.contacts.forEach(contact => {
        Email.send({
          from: 'kasserer@esbjerg-karate.dk',
          to: contact.email,
          subject: 'Velkommen til Esbjerg Shuri Ryu Karate klub: ',
          text: `Hej, tak fordi I meldte ${student.name} ind i Esbjerg Shuri Ryu Karate. \n\nI mangler nu kun at betale kontingent. Vores kontingent er som følger:\n\n- Voksne +15 år: 750 kr.\n- Junior 10 - 14 år: 550 kr.\n- Børn 7 - 9 år: 450 kr.\n\n Dette kan overføres til klubbens konto i Spar Nord, reg: 9244 konto: 4574880136.\n\nI kan se mere om kontingent på klubbens hjemmeside på http://esbjerg-karate.dk/iuiiu/kontingent eller bare udforske lidt om klubben på http://esbjerg-karate.dk, og I er meget velkomne til at skrive til os, hvis I har spørgsmål. For spørgsmål omkring medlemsskab kan i skrive til mig på kasserer@esbjerg-karate (denne mail kan ikke besvares) og for spørgsmål om træningen kan I skrive til Boris på boris_jensen@hotmail.com eller bare kontakte ham eller en af de andre trænere nede i klubben\n\nMvh. Bjarne Moos, kasserer`
        });
      });
      Email.send({
        from: 'kasserer@esbjerg-karate.dk',
        to: 'boris@esbjerg-karate.dk',
        subject: 'Ny elev tilmelding',
        text: JSON.stringify(student)
      });
    }
  }
});