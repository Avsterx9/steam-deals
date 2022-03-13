import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {AppConfigService} from "../app-config.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.sass"],
})
export class FooterComponent {
  apiVersion!: string;

  constructor(private configService: AppConfigService, private http: HttpClient) {
    this.getCurrentApiVersion();
  }

  private getCurrentApiVersion() {
    this.http.get(this.configService.apiBaseUrl).subscribe((response: any) => {
      this.apiVersion = response.version;
    });
  }
}
