import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/users.service'
import template from './sign-in.component.html';

@Component({
  selector: 'sign-in',
  template
})
export class SignInComponent {

  signInForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    const credentials: { username: string, password: string }  = this.signInForm.value
    this.userService.signIn(credentials.username, credentials.password)
  }
}
