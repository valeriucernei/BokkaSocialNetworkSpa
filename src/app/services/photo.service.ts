import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService
  ) { }

  upload(files: FileList, postId: string): Observable<HttpEvent<object>> {
    if (files.length === 0) return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('postId', postId);

    return this.http.post('https://localhost:7184/api/Photos/upload', formData, {
      reportProgress: true,
      observe: 'events'})
      .pipe(catchError(this.errorHandling.handleError<HttpEvent<object>>()));
  }
}
