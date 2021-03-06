import {Component, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../exported-functions/MustMatch";
import {RegistrationService} from "../services/registration.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.sass"],
})
export class RegistrationComponent implements OnInit {
  submitted: boolean = false;
  serverErrorStatus: boolean = false;
  serverErrorMsg: string = "";
  registrationSucceed: boolean = false;
  redirectUrl: string = "/login";
  regForm!: FormGroup;

  constructor(private registrationService: RegistrationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        userName: ["", Validators.required],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        mail: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  get controls() {
    return this.regForm.controls;
  }

  submit() {
    this.submitted = true;
    this.serverErrorStatus = false;

    if (this.regForm.invalid) {
      return;
    }

    this.registerUser(
      this.regForm.get("userName")?.value,
      this.regForm.get("mail")?.value,
      this.regForm.get("firstName")?.value,
      this.regForm.get("lastName")?.value,
      this.regForm.get("password")?.value
    );
  }

  private registerUser(userName: string, email: string, firstName: string, lastName: string, password: string) {
    this.registrationService.registerNewUser(userName, email, firstName, lastName, password).subscribe(
      (res: any) => {
        this.registrationSucceed = true;
      },
      (err: any) => {
        this.serverErrorStatus = true;
        this.serverErrorMsg = err.error.detail;
      }
    );
  }
}
