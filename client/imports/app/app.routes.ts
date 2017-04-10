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
import { SignInComponent } from '../../../imports/client/misc/sign-in.component' ;

import { AuthGuard } from './auth-guard';
import { EmailsGuard } from './emails-guard'
import { PaymentsGuard } from './payments-guard'

export const routes: Route[] = [
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: FrontPageComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsListComponent, canActivate: [AuthGuard] },
  { path: 'students/edit/:studentId', component: StudentEditComponent, canActivate: [AuthGuard] },
  { path: 'students/:studentId', component: StudentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'emails', component: StudentsEmailsComponent, canActivate: [AuthGuard, EmailsGuard] },
  { path: 'classes', component: ClassesListComponent, canActivate: [AuthGuard] },
  { path: 'classes/:classId', component: ClassDetailsComponent , canActivate: [AuthGuard]},
  { path: 'attendance/:classId', component: ClassAttendanceComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: StudentSignupComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: StudentsTrainingFeesComponent, canActivate: [AuthGuard, PaymentsGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];
