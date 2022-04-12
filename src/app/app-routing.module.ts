import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "user", component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
