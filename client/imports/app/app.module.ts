import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthGuard } from './auth-guard'
import { UserService } from '../../../imports/client/services/users.service'
import { STUDENTS_DECLARATIONS } from '../../../imports/client/students';
import { CLASSES_DECLARATIONS } from '../../../imports/client/classes';
import { MISC_DECLARATIONS } from '../../../imports/client/misc';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  declarations: [
    AppComponent,
    ...MISC_DECLARATIONS,
    ...STUDENTS_DECLARATIONS,
    ...CLASSES_DECLARATIONS
  ],
  providers: [
    AuthGuard,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}