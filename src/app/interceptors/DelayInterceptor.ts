import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import {delay, Observable} from 'rxjs';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    return next.handle(request).pipe(delay(1500));
  }
}
