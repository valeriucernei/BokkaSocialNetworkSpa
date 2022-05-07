import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable} from "rxjs";
import {LikeResponseModel} from "../models/Like/LikeResponseModel";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  baseUrl = environment.apiUrl + "Likes/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService
  ) { }

  like(postId: string): Observable<LikeResponseModel> {
    return this.http.post<LikeResponseModel>(this.baseUrl + "like-action", { postId: postId })
      .pipe(catchError(this.errorHandling.handleError<LikeResponseModel>()));
  }
}
