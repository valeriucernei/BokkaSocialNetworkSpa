import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge} from "rxjs";
import {PostListModel} from "../shared/models/post-list.model";
import {PostService} from "../shared/post.service";
import {PagedResult} from "../../_core/models/paged-result.model";
import {TableColumn} from "../../_core/models/table-column.table";
import {RequestFilters} from "../../_core/models/request-filters.model";
import {FilterLogicalOperators} from "../../_core/models/filter-logical-operators.model";
import {PaginatedRequest} from "../../_core/models/paginated-result.model";
import {Filter} from "../../_core/models/filter.model";

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements AfterViewInit {

  isProgressBarVisible: boolean = true;

  pagedPosts: PagedResult<PostListModel>;

  tableColumns: TableColumn[] = [
    { name: 'id', index: 'id', displayName: 'Id' },
    { name: 'title', index: 'title', displayName: 'Title', useInSearch: true },
    { name: 'content', index: 'content', displayName: 'Content', useInSearch: true },
    { name: 'createdDateTime', index: 'createdDateTime', displayName: 'Published On' },
    { name: 'photo', index: 'photo', displayName: 'Photo' },
    { name: 'photoExtension', index: 'photoExtension', displayName: 'Photo Extension' },
    { name: 'likesCount', index: 'likesCount', displayName: 'Likes' },
    { name: 'user', index: 'user', displayName: 'Author' },
    { name: 'userId', index: 'userId', displayName: 'Author ID' }
  ];

  displayedColumns = ['title', 'content', 'createdDateTime', 'likesCount', 'user'];

  filterForm: FormGroup;

  requestFilters: RequestFilters = { filters: [], logicalOperator: FilterLogicalOperators.And };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      content: ['']
    });
    this.pagedPosts = {
      pageIndex: 0,
      pageSize: 10,
      total: 10,
      items: []
    }
  }

  ngAfterViewInit(): void {
    this.loadPostsFromApi();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPostsFromApi();
    })

  }

  loadPostsFromApi() {
    this.isProgressBarVisible = true;
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.postService.getPosts(paginatedRequest)
      .subscribe( (pagedPosts: PagedResult<PostListModel>) => {
        console.log(pagedPosts);
        this.pagedPosts = pagedPosts;
        this.isProgressBarVisible = false;
      });
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadPostsFromApi();
  }

  filterPostsFromForm() {
    this.createFiltersFromForm();
    this.loadPostsFromApi();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path : foundTableColumn!.index, value : controlValue };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

}
