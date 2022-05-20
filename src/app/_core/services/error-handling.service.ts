import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {SnackService} from "../../shared/snack.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  message: string = '';

  constructor(private snackService: SnackService) { }

  handleError<T>(result?: T) {

    return (error: any): Observable<T> => {
      console.error(error);

      let isArray: boolean = Array.isArray(error.error);

      if (!isArray)
        this.message += error.error.Message;
      else {
        error.error.forEach((e: any) => {
          this.message += e.description + '\n';
        });
      }

      if (this.message == '') {
        switch (error.status) {
          case 0: this.message += 'Network Error! Check your internet connection!'; break;
          case 400: this.message += 'Bad Request! Please fill in all the fields!'; break;
          case 401: this.message += 'Unauthorized! Access forbidden!'; break;
          case 404: this.message += 'Not Found! Resource you requested is missing!'; break;
          case 500: this.message += 'Internal Server Error.'; break;
        }
      }

      this.snackService.openSnack(this.message, true);
      this.message = '';

      return of(result as T);
    };
  }

}
