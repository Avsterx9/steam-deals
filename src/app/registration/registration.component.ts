import {Component, OnInit} from "@angular/core";
import {RegistrationService} from "../services/registration.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.sass"],
})
export class RegistrationComponent {
  userName!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password1!: string;
  password2!: string;

  errorMsg!: string;
  showError: boolean = false;

  constructor(private registrationService: RegistrationService) {}

  registerUser() {
    this.registrationService
      .registerNewUser(this.userName, this.email, this.firstName, this.lastName, this.password1)
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          this.showError = true;
          console.log(err);
        }
      );
  }
}
