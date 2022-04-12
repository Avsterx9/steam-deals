import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserAuthenticationService} from "../services/user-authentication.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.sass"],
})
export class UserProfileComponent implements OnInit {
  constructor(private authenticationService: UserAuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authenticationService.getUserDetails().subscribe(
      (res: any) => {},
      (err) => {
        this.router.navigate(["/login"]);
      }
    );
  }
}
