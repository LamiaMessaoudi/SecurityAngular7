import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {User} from '../Model/User';
import {Subject} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  request: HttpRequest<any>
  private listUsers: User[] = [];
  public UsersSubjet = new Subject<User[]>();
  private user: User;
  public UserSubjet = new Subject<User>();
  constructor(              private tokenStorage: TokenStorageService,
                            private httpClient: HttpClient) {
    this.getAllUsers();
  }


  emitUsers() {
    this.UsersSubjet.next(this.listUsers.slice());
  }
  getAllUsers() {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'access ' + this.tokenStorage.getToken()
   });
    this.httpClient.get(environment.apiUrl+'api/admin/findAllUser',{ headers: reqHeader }).subscribe(
      (res: any[]) => {
        console.log(res);
        this.listUsers = res;
        this.emitUsers();
      });
  }


  
ChangeRole(idUser:number)
{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'access ' + this.tokenStorage.getToken()
 });
  return this.httpClient.put(environment.apiUrl+'api/admin/changeRole/'+idUser,"",{ headers: reqHeader })
  .pipe(map(any=>{
      console.log("succes");
      this.getAllUsers();
  }));
}
}
