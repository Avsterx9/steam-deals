import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "src/environments/environment";
import {IUser} from "../userInterface";

@Injectable({
  providedIn: "root",
})
export class UserAuthenticationService {
  backendURL: string = environment.backendURL;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(userName: string, userPassword: string) {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", userPassword);

    return this.http.post(this.backendURL + "/token", formData, {withCredentials: true});
  }

  getUserDetails() {
    return this.http.get<IUser>(this.backendURL + "/me/info", {withCredentials: true});
  }

  logout() {
    this.http.post(this.backendURL + "/logout", "", {withCredentials: true}).subscribe(
      (res: any) => {
        console.log("Logout Success : " + res);
        window.location.reload();
      },
      (err) => {
        console.log("[ERROR] Logout Failed with status:" + err.status + " | Message: " + err.message);
      }
    );
  }

  sendVerificationMail() {
    return this.http.get(this.backendURL + "/resendVerificationMail", {withCredentials: true});
  }
}
