import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomepageComponent } from "./homepage/homepage.component";

import { APP_INITIALIZER } from "@angular/core";
import { AppConfigService } from "./app-config.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomepageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
