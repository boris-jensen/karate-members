import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { STUDENTS_DECLARATIONS } from './students';
import { CLASSES_DECLARATIONS } from './classes';
import { MISC_DECLARATIONS } from './misc';

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
    ...ROUTES_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}