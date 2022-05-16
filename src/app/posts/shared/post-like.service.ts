import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";
import {LikeResponseModel} from "./models/like-response.model";

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

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
