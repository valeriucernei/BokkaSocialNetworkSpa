import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PostListModel} from "../../models/Post/PostListModel";
import {MatPaginator} from "@angular/material/paginator";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements AfterViewInit {

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
