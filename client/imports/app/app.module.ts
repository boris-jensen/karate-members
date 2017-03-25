import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { PARTIES_DECLARATIONS } from './parties';
import { STUDENTS_DECLARATIONS } from './students';
import { CLASSES_DECLARATIONS } from './classes';

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
    ...PARTIES_DECLARATIONS,
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