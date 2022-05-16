import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {merge} from "rxjs";
import {PostListModel} from "../shared/models/post-list.model";
import {PostService} from "../shared/post.service";
import {PagedResult} from "../../_core/models/paged-result.model";
import {PaginatedRequestNoFilters} from "../../_core/models/paginated-request-no-filters.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements AfterViewInit {

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

}
