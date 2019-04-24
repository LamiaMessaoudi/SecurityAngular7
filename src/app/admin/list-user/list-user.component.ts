import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../Model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ModifyUserComponent } from '../modify-user/modify-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: User [];
  UsersSubscription: Subscription;
  totalRec : number;
  bsModalRef: BsModalRef;
  page: number = 1;
  constructor(  private route: ActivatedRoute,
                private router: Router,
                
                private userService: UserService,
                private bsModalService: BsModalService )
  { this.getUsers(); }

  ngOnInit() {
  }
  getUsers() {
    this.userService.emitUsers();
    this.UsersSubscription = this.userService.UsersSubjet.subscribe(
      (user: User[]) => {
        this.users = user;
        this.totalRec = this.users.length;
      }
    );
    this.userService.emitUsers();
  }



  deleteUser(id:number) {
    this.bsModalRef = this.bsModalService.show(DeleteUserComponent);
    this.bsModalRef.content.idUser=id;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
         console.log('deleted');
        }, 5000);
      }
    });

  }

  updateUser(user: User) {

    this.bsModalRef = this.bsModalService.show(ModifyUserComponent);
    this.bsModalRef.content.id=user.id;
    this.bsModalRef.content.name=user.name;
    this.bsModalRef.content.username=user.username;
    this.bsModalRef.content.email=user.email;
    


  }
}
