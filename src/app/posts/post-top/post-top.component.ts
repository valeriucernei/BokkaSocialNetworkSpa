import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {PostListModel} from "../shared/models/post-list.model";
import {PostService} from "../shared/post.service";

@Component({
  selector: 'app-post-top',
  templateUrl: './post-top.component.html',
  styleUrls: ['./post-top.component.css']
})
export class PostTopComponent implements AfterViewInit {

  isProgressBarVisible: boolean = true;

  posts: PostListModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService
  ) { }

  ngAfterViewInit(): void {
    this.loadPostsFromApi();
  }

  loadPostsFromApi() {
    this.isProgressBarVisible = true;
    this.postService.getTopPosts()
      .subscribe( (pagedPosts: PostListModel[]) => {
        console.log(pagedPosts);
        this.posts = pagedPosts;
        this.isProgressBarVisible = false;
      });
  }

}
