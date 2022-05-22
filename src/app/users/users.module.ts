import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { SharedModule } from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {UsersRoutingModule} from "./users-routing.module";
import { UserSettingsComponent } from './user-settings/user-settings.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserChangePasswordComponent,
    UserSettingsComponent
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UsersModule { }
