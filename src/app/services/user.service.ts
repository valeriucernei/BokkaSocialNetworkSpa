import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {PersonalProfileModel} from "../models/User/PersonalProfileModel";
import {environment} from "../../environments/environment";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  baseUrl = environment.apiUrl + "Users/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService
  ) { }

  getPersonalProfileData(): Observable<PersonalProfileModel> {
    return this.http.get<PersonalProfileModel>(this.baseUrl + "user")
      .pipe(catchError(this.errorHandling.handleError<PersonalProfileModel>()));
  }

  updatePersonalProfileData(personalProfileModel: PersonalProfileModel): Observable<PersonalProfileModel> {
    return this.http.put<PersonalProfileModel>(this.baseUrl + "update", personalProfileModel)
      .pipe(catchError(this.errorHandling.handleError<PersonalProfileModel>()));
  }
}
