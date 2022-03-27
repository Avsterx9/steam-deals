import {Component, OnInit} from "@angular/core";
import { UserAuthenticationService } from "../services/user-authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
  userName:string='';
  userPassword:string='';

  constructor(private authenticationService: UserAuthenticationService) {}

  loginUser() {
    this.authenticationService.loginUser(this.userName, this.userPassword);
  }
}
