import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { ConnectionWrapperService } from './connection-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  backendURL: string = "http://localhost:5555";

  constructor(private http: HttpClient, private router: Router, private wrapper : ConnectionWrapperService) {
  }

  loginUser(userName: string, userPassword: string) {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", userPassword);

    this.http.post(this.backendURL + "/token", formData, {withCredentials: true}).subscribe(
      (res: any) => {
        console.log("Login Succes, Token: " + res)
        window.location.reload();
      },
      (err) => {
        console.log("Login Failed" + err)
        return err;
      }
    )
  }

  getUserDetails() {
    return this.http.get(this.backendURL + "/me", {withCredentials: true})
  }

  logout() {
    let enco : any = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(this.backendURL + "/logout", {headers: enco, withCredentials: true}).subscribe(
      (res: any) => {
        console.log("Logout Success : " + res);
      },
      (err) => {
        console.log("Logout Failed" + err);
        return err;
      }
    )
  }
}

