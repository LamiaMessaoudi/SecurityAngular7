import { Component, OnInit , EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../Model/User';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  UpdateUser: FormGroup;
  file2:File;
  user:User=new User()
  constructor(private bsModalRef: BsModalRef ,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }
  ngOnInit()
  {
    this.initForm();
  }
  selectFile2(event)
  {
     let reader=new FileReader();
     if(event.target.files && event.target.files.length>0)
     {
        this.file2=event.target.files[0];
        console.log(this.file2);
     }
  }


  initForm()
  {
    this.UpdateUser = this.formBuilder.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
     
      file2:[]
    });
  }
  onClose() 
{
    this.bsModalRef.hide();
 }
 update()
 {
  const id=this.UpdateUser.get('id').value;
  const name=this.UpdateUser.get('name').value;
  const username=this.UpdateUser.get('username').value;
  const email=this.UpdateUser.get('email').value;
  this.user.name=name;
  this.user.email=email;
  console.log("hamouch");
  console.log(this.user.email);
  this.user.username=username;
  const donn:FormData=new FormData();
  donn.append('image',this.file2);
  donn.append("user",new Blob([JSON.stringify(this.user)], {
    type: "application/json"
})
);

this.userService.updateUser(donn,id)
.pipe(first())
.subscribe(
 data=>{
          console.log("succes");
          this.event.emit('OK');
          this.bsModalRef.hide();
 },
 error=>{
          console.log("erreur");
         
 }
);

 }

}
