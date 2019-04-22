import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(donn: FormData) {
    return this.http.post(`http://localhost:1111/api/auth/signup`, donn)
      .pipe(map(user => {
        // register successful if there's a jwt token in the response




      }));
  }


  login(username: string, password: string): Observable<JwtResponse> {
    console.log('lamia messaoudi');
    const params = new HttpParams().set('username', username).set('password', password);
    console.log(params);
    return this.http.post<JwtResponse>('http://localhost:1111/api/auth/signin', params);
  }
}
