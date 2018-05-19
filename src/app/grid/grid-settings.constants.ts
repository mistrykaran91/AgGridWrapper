
export class GridSettingsConstants {

  /* Grid Properties */
  static enableSorting = true;
  static enableColResize = true;
  static suppressPaginationPanel = true;
  static singleClickEdit = true;

  static editable = false;
  static enablePagination = false;
  static rowDeselection = false;
  static enableFilter = false;

  static rowSelection = 'multiple'; // or single
  static rowHeight = 25;

  static sortAsc = 'asc';
  static sortDesc = 'desc';

  static defaultHeaderClass = 'grid-sort';

  /* Pagination Property */
  static defaultPageSize = 10;
  static defaultCurrentPage = 1;
  static defaultMaxRowFound = false;

  static rowsPerPage: Array<number> = [5, 10, 15];

  static defaultFormat = 'DD/MM/YYYY hh:mm:ss';

  static defaultNoRows: string = "No Records Found.";
  static defaultDomLayout: string = "autoHeight";

}
