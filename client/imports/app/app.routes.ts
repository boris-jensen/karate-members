import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';
import { StudentDetailsComponent } from './students/student-details.component';
import { StudentsListComponent } from './students/students-list.component';
import { ClassesListComponent } from './classes/classes-list.component';
import { ClassDetailsComponent } from './classes/class-details.component';

export const routes: Route[] = [
  { path: '', component: PartiesListComponent },
  { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:studentId', component: StudentDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'classes', component: ClassesListComponent },
  { path: 'classes/:classId', component: ClassDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
