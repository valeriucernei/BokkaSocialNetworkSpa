import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PaginatedRequest} from "../infrastructure/models/PaginatedRequest";
import {Observable} from "rxjs";
import {PagedResult} from "../infrastructure/models/PagedResult";
import {PostListModel} from "../models/Post/PostListModel";
import {PaginatedRequestNoFilters} from "../infrastructure/models/PaginatedRequestNoFilters";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl + "Posts/";

  constructor(
    private http: HttpClient
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
}
