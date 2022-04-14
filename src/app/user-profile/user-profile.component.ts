import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserAuthenticationService} from "../services/user-authentication.service";
import {IUser} from "../userInterface";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.sass"],
})
export class UserProfileComponent implements OnInit {
  userDetails!: IUser;

  constructor(private authenticationService: UserAuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authenticationService.getUserDetails().subscribe(
      (res: IUser) => {
        this.userDetails = res;
      },
      (err) => {
        this.router.navigate(["/login"]);
      }
    );
  }

  resendVerificationMail() {
    this.authenticationService.sendVerificationMail().subscribe(
      (res: any) => {
        alert(res.detail);
      },
      (err) => {
        alert(err.phrase);
      }
    );
  }
}
