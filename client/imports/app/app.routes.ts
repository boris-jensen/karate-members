import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { StudentDetailsComponent } from './students/student-details.component';
import { StudentsListComponent } from './students/students-list.component';
import { StudentSignupComponent } from './students/student-signup.component';
import { StudentsTrainingFeesComponent } from './students/students-training-fees.component';
import { ClassesListComponent } from './classes/classes-list.component';
import { ClassDetailsComponent } from './classes/class-details.component';
import { ClassAttendanceComponent } from './classes/class-attendance.component';
import { FrontPageComponent } from './misc/frontpage.component';
import { PageNotFoundComponent } from './misc/page-not-found.component';

export const routes: Route[] = [
  { path: '', component: FrontPageComponent },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:studentId', component: StudentDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'classes', component: ClassesListComponent },
  { path: 'classes/:classId', component: ClassDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'attendance/:classId', component: ClassAttendanceComponent },
  { path: 'signup', component: StudentSignupComponent },
  { path: 'payment', component: StudentsTrainingFeesComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
