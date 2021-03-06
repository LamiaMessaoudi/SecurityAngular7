import { Component, OnInit } from '@angular/core';
import {User} from '../Model/User';
import {UserService} from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {Route, Router} from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  users: User ;

  constructor( private userService: UserService,
                private tokenStorage:TokenStorageService,
                private router: Router,
              ) {this.getCurrentUser(); }

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
