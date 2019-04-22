import { Component, OnInit,EventEmitter  } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef,
              private userService: UserService) { }

  ngOnInit() {
  }
  onClose() {
    this.bsModalRef.hide();

  }
  deleteUser(id:number)
  {
    this.userService.deleteUser(id).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

}
