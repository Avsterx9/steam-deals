import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";
import {UserAuthenticationService} from "../services/user-authentication.service";
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
  check: boolean = false;

  isLogged: boolean = false;
  userDetails: any;

  constructor(
    private localStorageService: LocalStorageService,
    private authenticationService: UserAuthenticationService
  ) {
    let theme = localStorageService.getAndParse("theme");
    if (theme) {
      this.isDark = theme.isDark;
    } else {
      theme = this.darkTheme;
      localStorageService.update("theme", theme);
      this.isDark = true;
    }
    this.setColorVariables(theme);

    this.checkIfUserIsLogged();
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

  checkIfUserIsLogged() {
    this.authenticationService.getUserDetails().subscribe(
      (res: any) => {
        console.log("Logged User: " + res.first_name + " " + res.last_name);
        this.isLogged = true;
        this.userDetails = res;
      },
      (err) => {
        this.isLogged = false;
      }
    );
  }

  logout() {
    this.authenticationService.logout();
  }
}
