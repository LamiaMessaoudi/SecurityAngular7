import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../Model/User';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  UpdateUser: FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  file: File;
  user: User = new User();
  users: User ;
  UsersSubscription: Subscription;
  idUserCurrent:number;
  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private userService: UserService)
               {
                 this.getCurrentUser();
                 this.getId();
              }
ngOnInit() {
    this.initForm();
    this.getCurrentUser();
    this.getId();
  }
  get f() { return this.UpdateUser.controls; }
  initForm() {
    this.UpdateUser = this.formBuilder.group({
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
    this.update();
  }
  getCurrentUser()
  {
    this.userService.getCurrentUser().then(
      (user: User) => {
        this.users = user;
        this.UpdateUser.get('Name').setValue(this.users.name);
        this.UpdateUser.get('Email').setValue(this.users.email);
        this.UpdateUser.get('Username').setValue(this.users.username);

        
      }
    );

  }
  update()
  {
   const id=this.users.id;
   const name=this.UpdateUser.get('Name').value;
   const username=this.UpdateUser.get('Username').value;
   const email=this.UpdateUser.get('Email').value;
   this.user.name=name;
   this.user.email=email;
   this.user.username=username;
   const donn:FormData=new FormData();
   donn.append('image',this.file);
   donn.append("user",new Blob([JSON.stringify(this.user)], {
     type: "application/json"
 })
 );
 
 this.userService.updateUser(donn,id)
 .pipe(first())
 .subscribe(
  data=>{
    console.log("succes");
  },
  error=>{
           console.log("erreur");
          
  }
 );
 
  }
  getId()
  {
    this.idUserCurrent=this.userService.iduser;
    
  }
 
 }
 
