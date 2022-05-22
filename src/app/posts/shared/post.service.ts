import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";
import {PostListModel} from "./models/post-list.model";
import {PostNewModel} from "./models/post-new.model";
import {PostModel} from "./models/post.model";
import {PaginatedRequest} from "../../_core/models/paginated-result.model";
import {PagedResult} from "../../_core/models/paged-result.model";
import {PaginatedRequestNoFilters} from "../../_core/models/paginated-request-no-filters.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl + "Posts/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService
  ) { }

  getPosts(paginatedRequest: PaginatedRequest): Observable<PagedResult<PostListModel>> {
    return this.http.post<PagedResult<PostListModel>>(this.baseUrl + "search", paginatedRequest)
      .pipe(catchError(this.errorHandling.handleError<PagedResult<PostListModel>>()));
  }

  getPostsNoFiltering(paginatedRequest: PaginatedRequestNoFilters): Observable<PagedResult<PostListModel>> {
    return this.http.post<PagedResult<PostListModel>>(this.baseUrl + "search", paginatedRequest)
      .pipe(catchError(this.errorHandling.handleError<PagedResult<PostListModel>>()));
  }

  getTopPosts(): Observable<PostListModel[]> {
    return this.http.get<PostListModel[]>(this.baseUrl + "top")
      .pipe(catchError(this.errorHandling.handleError<PostListModel[]>()));
  }

  getUserPosts(userId: string): Observable<PostListModel[]> {
    return this.http.get<PostListModel[]>(this.baseUrl + "user/" + userId)
      .pipe(catchError(this.errorHandling.handleError<PostListModel[]>()));
  }

  getPost(postId: string): Observable<PostListModel> {
    return this.http.get<PostListModel>(this.baseUrl + "post/" + postId)
      .pipe(catchError(this.errorHandling.handleError<PostListModel>()));
  }

  createPost(newPostModel: PostNewModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.baseUrl + "create", newPostModel)
      .pipe(catchError(this.errorHandling.handleError<PostModel>()));
  }
}
