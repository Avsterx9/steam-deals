import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionWrapperService {

  constructor(private http: HttpClient) { }
  credentialOptions = {withCredentials: true};

  checkLoggedUser(methodType: string, url: string){
   // @ts-ignore
   //  this.http.request({method: methodType, url: url}).subscribe(
   //   res => {
   //   console.log("WRAPPER:" + res);
   //   }
   // )
  }
}
