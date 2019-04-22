import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TokenStorageService} from '../../services/token-storage.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  get f() {
    return this.signinForm.controls;
  }


  initForm() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  redirect() {
    this.router.navigate(['auth/signup']);
  }


  onSubmit() {
    const username = this.signinForm.get('username').value;
    const password = this.signinForm.get('password').value;

    this.submitted = true;

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }


    this.loading = true;
    console.log(username);
    console.log(password);
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        console.log(data.accessToken);
        console.log(data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        if (this.roles.toString() === 'ROLE_ADMIN')
        {this.router.navigate(['listUser']); }
        else if (this.roles.toString() === 'ROLE_USER')
        {this.router.navigate(['espaceUser']); }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }



}
