import { Component, OnInit } from '@angular/core';
import {User} from '../Model/User';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  users: User ;

  constructor( private userService: UserService,
    private tokenStorage:TokenStorageService,
    private router: Router) {this.getCurrentUser(); }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.userService.getCurrentUser().then(
      (user: User) => {
        this.users = user;

        console.log(this.users.id);

      }
    );

  }
  logout()
  {
    this.tokenStorage.signOut();
    this.router.navigate(['/auth/signin']); 

  }
}
