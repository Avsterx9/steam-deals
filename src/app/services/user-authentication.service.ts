import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  backendURL: string = "http://localhost:5555";

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(userName: string, userPassword: string) {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", userPassword);

    this.http.post(this.backendURL + "/token", formData).subscribe(
      (res: any) => {
        console.log("Login Successful")
        this.saveUserToken(res['access_token']);
        window.location.reload();
      },
      (err) => {
        return err;
      }
    )
  }

  private saveUserToken(responseData: any) {
    localStorage.setItem("access-token", responseData as string)
  }

  private getUserAccessToken(): string {
    return localStorage.getItem("access-token") || '{}'
  }

  authenticateUser() {
    var accessToken = this.getUserAccessToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    return this.http.get(this.backendURL + "/me", {headers: headers})
  }

  logout() {
    localStorage.removeItem("access-token");
  }
}

