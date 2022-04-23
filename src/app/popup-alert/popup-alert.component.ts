import {Component, Input, Output} from "@angular/core";

@Component({
  selector: "app-popup-alert",
  templateUrl: "./popup-alert.component.html",
  styleUrls: ["./popup-alert.component.sass"],
})
export class PopupAlertComponent {
  bannerDisplayed: boolean = true;

  @Input()
  redirectUrl: string = "";

  hidePopup() {
    this.bannerDisplayed = false;
    if (this.redirectUrl != "") {
      window.location.href = this.redirectUrl;
    }
  }
}
