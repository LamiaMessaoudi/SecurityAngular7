import { Injectable } from '@angular/core';
import {User} from '../Model/User';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {map} from 'rxjs/operators';
import { environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  request: HttpRequest<any>
  private listUsers: User[] = [];
  public UsersSubjet = new Subject<User[]>();
  private user: User=new User();
  public UserSubjet = new Subject<User>();
  public iduser:number;
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
    this.httpClient.get(environment.apiUrl+'api/admin/findAllUsers', { headers: reqHeader }).subscribe(
      (res: any[]) => {
        this.listUsers = res;
        this.emitUsers();
      });
  }
  deleteUser(id:number)
{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'access ' + this.tokenStorage.getToken()
 });
 
  
  return this.httpClient.delete(environment.apiUrl+'api/admin/deleteUser/'+id, { headers: reqHeader })
  .pipe(map(any=>{
      console.log("succes");
      this.getAllUsers();
  }));
}
updateUser(donn:FormData,idPost:number)
{
 
  return this.httpClient.put(environment.apiUrl+'api/auth/updateUser/'+idPost,donn)
  .pipe(map(res=>{
   

 
  this.getAllUsers();
  
     
  }));
}
getCurrentUser()
{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'access ' + this.tokenStorage.getToken()
 });
  const username=this.tokenStorage.getUsername();
  return new Promise((resolve, reject) => {
  this.httpClient.get(environment.apiUrl+'api/admin/getUser/'+username, { headers: reqHeader }).subscribe(
    (res: any[])=>{
        resolve(res);
       this.iduser=res['id'];
       console.log('hello' + this.iduser);
        },
      (erreur)=>{ // Error
        reject(erreur);
    });

});
}
}
