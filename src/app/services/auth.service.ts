import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {Router} from "@angular/router";
import {SnackService} from "./snack.service";
import {UserForLogin} from "../models/User/UserForLogin";
import {catchError, Observable} from "rxjs";
import {BearerToken} from "../models/User/BearerToken";
import {UserForRegister} from "../models/User/UserForRegister";
import {Response} from "../models/Response";

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
      this.loggedIn = true;
    }
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    this.loggedIn = false;
    this.router.navigate(['/']).then();
    this.snackService.openSnack('Successfully logged out.');
  }

  login(userForLoginDto: UserForLogin): Observable<BearerToken> {
    return this.http
      .post<BearerToken>(this.baseUrl + 'login/', userForLoginDto)
      .pipe(catchError(this.errorHandling.handleError<BearerToken>()));
  }

  register(userForRegisterDto: UserForRegister): Observable<Response>{
    return this.http
      .post<Response>(this.baseUrl + 'register/', userForRegisterDto)
      .pipe(catchError(this.errorHandling.handleError<Response>()));
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
