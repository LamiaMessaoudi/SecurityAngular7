import { Component, OnInit } from '@angular/core';
import {User} from '../../Model/User';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {RoleService} from '../../services/role.service';
import { ModalChangeRoleComponent } from '../modal-change-role/modal-change-role.component';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  users: User [];
  UsersSubscription: Subscription;
  totalRec : number;
  bsModalRef: BsModalRef;
  page: number = 1;
  constructor(  private route: ActivatedRoute,
                private router: Router,
                private roleService: RoleService,
                private bsModalService: BsModalService )
  { this.getUsers(); }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.roleService.emitUsers();
    this.UsersSubscription = this.roleService.UsersSubjet.subscribe(
      (user: User[]) => {
        this.users = user;
        this.totalRec = this.users.length;
      }
    );
    this.roleService.emitUsers();
  }
  ChangeRoleUser(idUser:number)
  {
    this.bsModalRef = this.bsModalService.show(ModalChangeRoleComponent);
   this.bsModalRef.content.idUser=idUser;
   /* this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
         console.log('deleted');
        }, 5000);
      }
    });*/

  }

}
