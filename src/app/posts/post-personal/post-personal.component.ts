import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {PostListModel} from "../shared/models/post-list.model";
import {PostService} from "../shared/post.service";
import {AuthService} from "../../_core/services/auth.service";

@Component({
  selector: 'app-post-personal',
  templateUrl: './post-personal.component.html',
  styleUrls: ['./post-personal.component.css']
})
export class PostPersonalComponent implements AfterViewInit {

  isProgressBarVisible: boolean = true;

  posts: PostListModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    this.loadPostsFromApi();
  }

  private loadPostsFromApi() {
    this.isProgressBarVisible = true;
    this.postService.getUserPosts(this.authService.getUserId())
      .subscribe( (pagedPosts: PostListModel[]) => {
        console.log(pagedPosts);
        this.posts = pagedPosts;
        this.isProgressBarVisible = false;
      });
  }

}
