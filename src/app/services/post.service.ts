import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PaginatedRequest} from "../infrastructure/models/PaginatedRequest";
import {catchError, Observable} from "rxjs";
import {PagedResult} from "../infrastructure/models/PagedResult";
import {PostListModel} from "../models/Post/PostListModel";
import {PaginatedRequestNoFilters} from "../infrastructure/models/PaginatedRequestNoFilters";
import {NewPostModel} from "../models/Post/NewPostModel";
import {PostModel} from "../models/Post/PostModel";
import {ErrorHandlingService} from "./error-handling.service";

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
    return this.http.post<PagedResult<PostListModel>>(this.baseUrl + "search", paginatedRequest);
  }

  getPostsNoFiltering(paginatedRequest: PaginatedRequestNoFilters): Observable<PagedResult<PostListModel>> {
    return this.http.post<PagedResult<PostListModel>>(this.baseUrl + "search", paginatedRequest);
  }

  getTopPosts(): Observable<PostListModel[]> {
    return this.http.get<PostListModel[]>(this.baseUrl + "top");
  }

  getUserPosts(userId: string): Observable<PostListModel[]> {
    return this.http.get<PostListModel[]>(this.baseUrl + "user/" + userId);
  }

  getPost(postId: string): Observable<PostListModel> {
    return this.http.get<PostListModel>(this.baseUrl + "post/" + postId);
  }

  createPost(newPostModel: NewPostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.baseUrl + "create", newPostModel)
      .pipe(catchError(this.errorHandling.handleError<PostModel>()));
  }
}
