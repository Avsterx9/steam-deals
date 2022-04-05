import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserAuthenticationService} from "../services/user-authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit{
  submitted: boolean = false;
  logForm!: FormGroup;

  constructor(private authenticationService: UserAuthenticationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", [Validators.required]],
    });
  }

  get controls() {
    return this.logForm.controls;
  }

  submit() {
    this.submitted = true;

    if (this.logForm.invalid) {
      return;
    }

    this.loginUser(this.logForm.get("userName")?.value, this.logForm.get("password")?.value);
  }

  private loginUser(userName: string, password: string) {
    this.authenticationService.loginUser(userName, password);
  }
}
