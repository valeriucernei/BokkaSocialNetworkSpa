import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ProgressBarService} from "../../shared/progress-bar.service";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private progressBarService: ProgressBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    this.progressBarService.setLoading(true);

    return next.handle(request)
      .pipe(
        tap({
          next: event => {
            if (event instanceof HttpResponse)
              this.progressBarService.setLoading(false); },
          error: () => { this.progressBarService.setLoading(false); }
        })
      );
  };

}
