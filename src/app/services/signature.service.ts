import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  constructor( private httpClient: HttpClient) { }
  SignDocument(don:FormData)
  {
    return this.httpClient.post(environment.apiUrl+'api/auth/signer',don)
          .pipe(map((res : any[]) => {
           console.log(res);
          }));
  }


  VerifSign(don:FormData)
  {
    return this.httpClient.post(environment.apiUrl+'api/auth/verifysigner',don)
          .pipe(map(res => {
           
          }));
  }

}
