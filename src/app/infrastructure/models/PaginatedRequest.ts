import {RequestFilters} from "./RequestFilters";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export class PaginatedRequest {
  pageIndex: number;
  pageSize: number;
  columnNameForSorting: string;
  sortDirection: string;
  requestFilters: RequestFilters;

  constructor(paginator: MatPaginator, sort: MatSort, filters: RequestFilters) {
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;
    this.columnNameForSorting = sort.active;
    this.sortDirection = sort.direction;
    this.requestFilters = filters;
  }

}
