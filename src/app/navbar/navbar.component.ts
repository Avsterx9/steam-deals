import {Component, OnInit} from "@angular/core";
import {ViewChild} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";
import {DarkTheme, LightTheme, Theme} from "../themes";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent {
  isDark!: boolean;
  darkTheme = new DarkTheme();
  lightTheme = new LightTheme();
  check : boolean = false;

  constructor(private localStorageService: LocalStorageService) {
    let theme = localStorageService.getAndParse("theme");
    if (theme) {
      this.isDark = theme.isDark;
    } else {
      theme = this.darkTheme;
      localStorageService.update("theme", theme);
      this.isDark = true;
    }
    this.setColorVariables(theme);
  }

  dropMenu() {
    this.check = !this.check;
  }

  switchTheme() {
    this.isDark = !this.isDark;
    let theme = this.isDark ? this.darkTheme : this.lightTheme;
    this.localStorageService.update("theme", theme);
    this.setColorVariables(theme);
  }

  setColorVariables(theme: Theme) {
    document.documentElement.style.setProperty("--background-color-dark-version", theme.backgroundDark);
    document.documentElement.style.setProperty("--font-color", theme.fontColor);
    document.documentElement.style.setProperty("--background-color-light-version", theme.backgroundLight);
    document.documentElement.style.setProperty("--primary-color", theme.primaryColor);
  }
}
