import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import template from './sign-in.component.html';

@Component({
  selector: 'sign-in',
  template
})
export class SignInComponent {

  signInForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    const credentials: { username: string, password: string }  = this.signInForm.value
    Meteor.loginWithPassword(credentials.username, credentials.password, (error) => {
      if (error) {
        alert(error)
      } else {
        this.router.navigate([''])
      }
    })
  }
}
