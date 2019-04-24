import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../Model/User';
import {first} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  file: File;
  user: User = new User();
  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  get f() { return this.signupForm.controls; }
  initForm() {
    this.signupForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      file: []

    });
  }
  selectFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }

  redirect() {
    this.router.navigate(['auth/signin']);
  }
  onSubmit() {
    const Name = this.signupForm.get('Name').value;
    const Username = this.signupForm.get('Username').value;
    const Email = this.signupForm.get('Email').value;
    const Password = this.signupForm.get('Password').value;
  /*  console.log(Name);
    console.log(Username);
    console.log(Email);
    console.log(Password);*/
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    const donn: FormData = new FormData();
    this.loading = true;
    this.user.name = Name;
    this.user.username = Username;
    this.user.email = Email;
    this.user.password = Password;
    donn.append('image', this.file);

    donn.append('user', new Blob([JSON.stringify(this.user)], {
        type: 'application/json'
      })
    );

    this.authService.register(donn)
      .pipe(first())
      .subscribe(
        data => {
          console.log('succes accueil');
          this.router.navigate(['/auth/signin']);

        },
        error => {
          console.log('echec accueil');
          this.loading = false;
          this.valid = true;

        }
      );
  }


}
