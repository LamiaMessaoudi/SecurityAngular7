import { Injectable } from '@angular/core';
import {User} from '../Model/User';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {map} from 'rxjs/operators';

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
    this.httpClient.get('http://localhost:1111/api/admin/findAllUsers', { headers: reqHeader }).subscribe(
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
 
  
  return this.httpClient.delete('http://localhost:1111/api/admin/deleteUser/'+id, { headers: reqHeader })
  .pipe(map(any=>{
      console.log("succes");
      this.getAllUsers();
  }));
}
updateUser(donn:FormData,idPost:number)
{
 
  return this.httpClient.put('http://localhost:1111/api/auth/updateUser/'+idPost,donn)
  .pipe(map(res=>{
   

 
  this.getAllUsers();
  
     
  }));
}
getCurrentUser()
{
  const username=this.tokenStorage.getUsername();
  return new Promise((resolve, reject) => {
  this.httpClient.get('http://localhost:1111/api/auth/getUser/'+username).subscribe(
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
