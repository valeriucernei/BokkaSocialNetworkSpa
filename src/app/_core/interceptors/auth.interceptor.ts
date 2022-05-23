import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {BearerToken} from "../models/bearer-token.model";
import {SnackService} from "../../shared/snack.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private snackService: SnackService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (this.authService.loggedIn && !request.headers.has("isTokenRefreshing"))
      this.checkTokenSoonExpire(accessToken);

    if(accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }

    return next.handle(request);
  }

  private checkTokenSoonExpire(accessToken: string) {
    const decoded = this.authService.decodeToken(accessToken);
    const exp_date = new Date(decoded.exp * 1000);
    const current_date = new Date();
    const date_difference = (exp_date.getTime() - current_date.getTime()) / 1000;

    if (date_difference <= 900 && date_difference > 10)
      this.authService.refreshToken().subscribe((bearerToken: BearerToken) => {
        if (!bearerToken) return;

        localStorage.setItem('accessToken', bearerToken.access_token);
        this.authService.updateUserPaidStatus();
        this.snackService.openSnack("Current session token automatically renewed.");
      })
  }


}
