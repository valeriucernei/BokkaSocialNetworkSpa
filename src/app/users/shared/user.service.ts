import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";
import {UserProfileModel} from "./models/user-profile.model";
import {UserChangePasswordModel} from "./models/user-change-password.model";
import {UserLoginComponent} from "../user-login/user-login.component";
import {UserRegisterComponent} from "../user-register/user-register.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + "Users/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
    private dialog: MatDialog
  ) { }

  getPersonalProfileData(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(this.baseUrl + "user")
      .pipe(catchError(this.errorHandling.handleError<UserProfileModel>()));
  }

  updatePersonalProfileData(personalProfileModel: UserProfileModel): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(this.baseUrl + "update", personalProfileModel)
      .pipe(catchError(this.errorHandling.handleError<UserProfileModel>()));
  }

  updatePassword(updatePasswordModel: UserChangePasswordModel): Observable<UserChangePasswordModel> {
    return this.http.put<UserChangePasswordModel>(this.baseUrl + "update-password", updatePasswordModel)
      .pipe(catchError(this.errorHandling.handleError<UserChangePasswordModel>()));
  }

  openLoginDialog() {
    this.dialog.open(UserLoginComponent, {
      width: '400px'
    });
  }

  openRegisterDialog() {
    this.dialog.open(UserRegisterComponent, {
      width: '400px'
    });
  }

}
