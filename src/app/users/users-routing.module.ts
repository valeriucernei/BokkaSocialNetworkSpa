import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserChangePasswordComponent} from "./user-change-password/user-change-password.component";

const usersRoutes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'change-password', component: UserChangePasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
