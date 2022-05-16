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
      console.log(error);

      if (!Array.isArray(error.error) && error.error) this.message += error.error;

      if (Array.isArray(error.error) && error.error.length > 0) {
        error.error.forEach((e: any) => {
          this.message += e.description + '\n';
        });
      }

      switch (error.status) {
        case 0:
          this.message += 'Network Error! Check your internet connection!';
          break;

        case 400:
          if (this.message == '') this.message += 'Bad Request! Please fill in all the fields!';
          break;

        case 401:
          if (this.message == '') this.message += 'Unauthorized! Access forbidden!';
          break;

        case 403:
          if (this.message == '') this.message += 'Wrong credentials.';
          break;

        case 404:
          if (this.message == '') this.message += 'Not Found! Resource you requested is missing!';
          break;

        case 500:
          this.message = 'Internal Server Error.';
          break;

        default:
          this.message = 'Unknown Error!';
          break;
      }

      this.snackService.openSnack(this.message, true);
      console.log("ERROR!");
      console.log(this.message);

      this.message = '';
      return of(result as T);
    };
  }

}
