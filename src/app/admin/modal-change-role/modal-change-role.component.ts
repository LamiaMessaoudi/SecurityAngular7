import { Component, OnInit,EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-modal-change-role',
  templateUrl: './modal-change-role.component.html',
  styleUrls: ['./modal-change-role.component.scss']
})
export class ModalChangeRoleComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef,
              private roleService: RoleService) { }

  ngOnInit() {
  }
  onClose() {
    this.bsModalRef.hide();

  }
  ChangeRole(idUser: number)
  {
    this.roleService.ChangeRole(idUser).subscribe();

    this.event.emit('OK');
    this.bsModalRef.hide();
  }


}
