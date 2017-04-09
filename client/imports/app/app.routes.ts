import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { StudentDetailsComponent } from '../../../imports/client/students/student-details.component';
import { StudentsListComponent } from '../../../imports/client/students/students-list.component';
import { StudentSignupComponent } from '../../../imports/client/students/student-signup.component';
import { StudentsTrainingFeesComponent } from '../../../imports/client/students/students-training-fees.component';
import { StudentEditComponent } from '../../../imports/client/students/student-edit.component';
import { StudentsEmailsComponent } from '../../../imports/client/students/students-emails.component';
import { ClassesListComponent } from '../../../imports/client/classes/classes-list.component';
import { ClassDetailsComponent } from '../../../imports/client/classes/class-details.component';
import { ClassAttendanceComponent } from '../../../imports/client/classes/class-attendance.component';
import { FrontPageComponent } from '../../../imports/client/misc/frontpage.component';
import { PageNotFoundComponent } from '../../../imports/client/misc/page-not-found.component';

export const routes: Route[] = [
  { path: '', component: FrontPageComponent },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/edit/:studentId', component: StudentEditComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'students/:studentId', component: StudentDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'emails', component: StudentsEmailsComponent, canActivate: ['canActivateForLoggedIn']},
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
