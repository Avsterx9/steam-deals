import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {environment} from "src/environments/environment";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.sass"],
})
export class FooterComponent {
  apiVersion!: string;

  constructor(private http: HttpClient) {
    this.getCurrentApiVersion();
  }

  private getCurrentApiVersion() {
    this.http.get(environment.backendURL).subscribe((response: any) => {
      this.apiVersion = response.version;
    });
  }
}
