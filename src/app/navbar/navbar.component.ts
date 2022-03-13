import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  constructor() {}

  expandHamburger(hamburger: HTMLButtonElement) {
    hamburger.classList.toggle("is-active");
  }
}
