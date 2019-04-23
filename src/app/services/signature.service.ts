import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  constructor( private httpClient: HttpClient) { }
  SignDocument(don:FormData)
  {
    return this.httpClient.post(`http://localhost:1111/api/auth/signer`,don)
          .pipe(map(res => {
           
          }));
  }


  VerifSign(don:FormData)
  {
    return this.httpClient.post(`http://localhost:1111/api/auth/verifysigner`,don)
          .pipe(map(res => {
           
          }));
  }

}
