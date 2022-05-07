import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PostService} from "../../services/post.service";
import {PagedResult} from "../../infrastructure/models/PagedResult";
import {PostListModel} from "../../models/Post/PostListModel";
import {PaginatedRequestNoFilters} from "../../infrastructure/models/PaginatedRequestNoFilters";
import {MatPaginator} from "@angular/material/paginator";
import {merge} from "rxjs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements AfterViewInit {

  isProgressBarVisible: boolean = true;

  pagedPosts: PagedResult<PostListModel>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService
  ) {
    this.pagedPosts = {
      pageIndex: 0,
      pageSize: 5,
      total: 0,
      items: []
    }
  }

  ngAfterViewInit(): void {
    this.loadPostsFromApi();

    merge(this.paginator.page).subscribe(() => {
      this.loadPostsFromApi();
    })

  }

  loadPostsFromApi() {
    this.isProgressBarVisible = true;
    const paginatedRequest = new PaginatedRequestNoFilters(this.paginator);
    this.postService.getPostsNoFiltering(paginatedRequest)
      .subscribe( (pagedPosts: PagedResult<PostListModel>) => {
        console.log(pagedPosts);
        this.pagedPosts = pagedPosts;
        this.isProgressBarVisible = false;
      });
  }

  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.pagedPosts.pageSize += 5;
  }

  onScrollUp(ev: any) {
    console.log("scrolled up!", ev);

    this.pagedPosts.pageSize += 5;
  }

}
