import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "./error-handling.service";
import {SnackService} from "../../shared/snack.service";
import {BearerToken} from "../models/bearer-token.model";
import {UserLoginModel} from "../../users/shared/models/user-login.model";
import {UserRegisterModel} from "../../users/shared/models/user-register.model";
import {ResponseModel} from "../../shared/response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'Users/';

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
    private router: Router,
    private snackService: SnackService
  ) { }

  checkUserToken() {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken');
      const decoded = this.decodeToken(token);
      const date = new Date(decoded.exp * 1000);
      const current_date = new Date();

      if (date < current_date) {
        this.snackService.openSnack('Session expired.', true);
        localStorage.removeItem('accessToken');
        return;
      }

      this.loggedIn = true;
    }
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    this.loggedIn = false;
    this.router.navigate(['/']).then();
    this.snackService.openSnack('Successfully logged out.');
  }

  login(userForLoginDto: UserLoginModel): Observable<BearerToken> {
    return this.http
      .post<BearerToken>(this.baseUrl + 'login/', userForLoginDto)
      .pipe(catchError(this.errorHandling.handleError<BearerToken>()));
  }

  register(userForRegisterDto: UserRegisterModel): Observable<ResponseModel>{
    return this.http
      .post<ResponseModel>(this.baseUrl + 'register/', userForRegisterDto)
      .pipe(catchError(this.errorHandling.handleError<ResponseModel>()));
  }

  getUserId(): string {
    let token = this.getToken();
    let decoded = this.decodeToken(token);

    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  decodeToken(token: string) {
    const _decodeToken = (token) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map(token => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

}
