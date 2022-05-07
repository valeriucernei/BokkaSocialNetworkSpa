import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PagedResult} from "../../infrastructure/models/PagedResult";
import {PostListModel} from "../../models/Post/PostListModel";
import {TableColumn} from "../../infrastructure/models/TableColumn";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RequestFilters} from "../../infrastructure/models/RequestFilters";
import {FilterLogicalOperators} from "../../infrastructure/models/FilterLogicalOperators";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PostService} from "../../services/post.service";
import {merge} from "rxjs";
import {PaginatedRequest} from "../../infrastructure/models/PaginatedRequest";
import {Filter} from "../../infrastructure/models/Filter";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

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
