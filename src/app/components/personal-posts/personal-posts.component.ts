import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PostListModel} from "../../models/Post/PostListModel";
import {MatPaginator} from "@angular/material/paginator";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-personal-posts',
  templateUrl: './personal-posts.component.html',
  styleUrls: ['./personal-posts.component.css']
})
export class PersonalPostsComponent implements AfterViewInit {

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

  loadPostsFromApi() {
    this.isProgressBarVisible = true;
    this.postService.getUserPosts(this.authService.getUserId())
      .subscribe( (pagedPosts: PostListModel[]) => {
        console.log(pagedPosts);
        this.posts = pagedPosts;
        this.isProgressBarVisible = false;
      });
  }

}
