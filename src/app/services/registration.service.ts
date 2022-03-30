import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private backendURL: string = environment.backendURL;

  constructor(private http: HttpClient) {}

  registerNewUser(username: string, email: string, first_name: string, last_name: string, password: string) {
    var jsonBody = {
      username: username,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
    };

    return this.http.post(this.backendURL + "/users", jsonBody, {withCredentials: true});
  }
}
