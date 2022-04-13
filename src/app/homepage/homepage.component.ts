import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.sass"],
})
export class HomepageComponent {
  bannerDisplayed: boolean = false;

  constructor() {
    if (!localStorage.getItem("cookieBannerDisplayed")) this.bannerDisplayed = true;
  }

  hideCookieContainer() {
    localStorage.setItem("cookieBannerDisplayed", "true");
    this.bannerDisplayed = false;
  }
}
