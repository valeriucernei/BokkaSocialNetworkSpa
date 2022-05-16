import {FilterLogicalOperators} from "./filter-logical-operators.model";
import {Filter} from "./filter.model";

export interface RequestFilters {
  logicalOperator: FilterLogicalOperators;
  filters: Filter[];
}
