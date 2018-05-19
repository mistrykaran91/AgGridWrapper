import {
  ColumnApi,
  GridApi,
  GridOptions
} from 'ag-grid/main';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import * as _ from 'lodash';

import { GridSettingsConstants } from './grid-settings.constants';
import { Pagination } from './grid.models';
import { ColDef } from 'ag-grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  public gridApi: GridApi = null;
  public gridOptions: GridOptions;
  private columnApi: ColumnApi = null;

  readonly rowsPerPage: Array<number> = GridSettingsConstants.rowsPerPage;
  private pageSizeChanged = false;

  pagination: Pagination = new Pagination();

  @Input('title') title: string;
  @Input('columnDefs') columnDefs: any;
  @Input('sourceData') sourceData: any;
  @Input('parent') parent: any = (!this.parent) ? null : this.parent;

  @Input('enableFilter') enableFilter: boolean = (!this.enableFilter) ? GridSettingsConstants.enableFilter : this.enableFilter;
  @Input('enableSorting') enableSorting: boolean = (!this.enableSorting) ? GridSettingsConstants.enableSorting : this.enableSorting;
  @Input('enableColResize') enableColResize: boolean = (!this.enableColResize) ? GridSettingsConstants.enableColResize : this.enableColResize;
  @Input('rowSelection') rowSelection: string = (!this.rowSelection) ? GridSettingsConstants.rowSelection : this.rowSelection;
  @Input('enablePagination') enablePagination: boolean = (!this.enablePagination) ? GridSettingsConstants.enablePagination : this.enablePagination;
  @Input('editable') editable: boolean = (!this.editable) ? GridSettingsConstants.editable : this.editable;

  @Output('gridReady') gridReady = new EventEmitter();
  @Output('rowSelected') rowSelected = new EventEmitter();
  @Output('getRows') getRows = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes.sourceData) {
          let source = [];
          if (changes.sourceData.currentValue) {
              if (_.isArray(changes.sourceData.currentValue)) {
                  source = changes.sourceData.currentValue;
              } else {
                  source = changes.sourceData.currentValue;
              }
          }

          this.sourceData = source;
          if (this.enablePagination) {
              this.setPager();
          }
          if (this.sourceData && this.gridApi) {
              this.gridApi.setRowData(this.sourceData.data ? this.sourceData.data : this.sourceData);
          }
      }
  }

  ngOnInit() {
      if (this.columnDefs) {
          this.setDefaultProperty();
          this.configureGridSettings();
      }
  }

  setDefaultProperty(): void {

      _.each(this.columnDefs, (columnDef: ColDef) => {

          if (!columnDef.suppressSorting) {
              columnDef.headerClass = GridSettingsConstants.defaultHeaderClass;
          }

      });

  }

  configureGridSettings(): void {
      this.gridOptions = {
          enableFilter: this.enableFilter,
          enableSorting: this.enableSorting,
          enableColResize: this.enableColResize,
          rowSelection: this.rowSelection,
          rowDeselection: GridSettingsConstants.rowDeselection,
          rowHeight: GridSettingsConstants.rowHeight,
          headerHeight: 40,
          pagination: this.enablePagination,
          paginationPageSize: GridSettingsConstants.defaultPageSize,
          suppressPaginationPanel: GridSettingsConstants.suppressPaginationPanel,
          onRowSelected: this.onRowSelected.bind(this),
          // suppressDragLeaveHidesColumns: true,
          suppressMovableColumns: true,
          defaultColDef: {
              editable: this.editable
          },
          context: {
              parent: this.parent
          },
          domLayout: GridSettingsConstants.defaultDomLayout,
          overlayNoRowsTemplate: `<div style="margin-top: 5% !important"> ${GridSettingsConstants.defaultNoRows} </div>`,
          singleClickEdit: GridSettingsConstants.singleClickEdit, // if edit mode is to be enabled in single click
          enableServerSideSorting: true,
          sortingOrder: [GridSettingsConstants.sortDesc, GridSettingsConstants.sortAsc], // other than this is null
          onSortChanged: this.onSortChanged.bind(this)
          // floatingFilter: true, //  to enable floating filter
          // rowStyle: { border: '1px solid Black' }, // to apply row Styling
          // animateRows: true, // to enable row animations while sorting/ filtering
          // onPaginationChanged: this.onPaginationPageLoaded
          // onPaginationPageRequested: this.onPaginationPageRequested,
          // onPaginationReset: this.onPaginationReset
      };
  }

  onReady(params: any): any {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      this.gridApi.setRowData(this.sourceData.data ? this.sourceData.data : this.sourceData);
      this.gridReady.emit({ gridApi: params.api, columnApi: this.columnApi });

      setTimeout(() => {
          this.gridApi.sizeColumnsToFit();
      }, 500);

      // this.setRowData();
  }

  onPageSizeChanged() {
      this.pageSizeChanged = true;
      this.pagination.totalPage = Math.ceil(this.pagination.totalRowCount / this.pagination.pageSize);

      // if user changes the row's per page to any other page and total pages after evaluating is less
      if (this.pagination.currentPage > this.pagination.totalPage) {
          this.pagination.currentPage = 1;
      }
      this.gridApi.paginationSetPageSize(this.pagination.pageSize);
      this.setRowData();
  }

  onRowSelected(): any {
      const selectedRow = this.gridApi.getSelectedRows();
      this.rowSelected.emit(selectedRow);
  }

  onPreviousClick() {
      if (this.pagination.currentPage > 0) {
          this.pagination.currentPage = this.pagination.currentPage - 1;
          this.setRowData();
      }
  }

  onSortChanged() {
      this.pagination.currentPage = 1;
      const [sortModel, ...rest] = _.cloneDeep(this.gridApi.getSortModel());
      if (sortModel) {
          this.pagination.sort = (sortModel.sort.toLowerCase() == GridSettingsConstants.sortAsc) ? sortModel.colId : `-${sortModel.colId}`;
      } else {
          this.pagination.sort = null;
      }
      this.setRowData();
  }

  onNextClick() {
      if (this.pagination.currentPage !== this.pagination.totalPage) {
          this.pagination.currentPage = this.pagination.currentPage + 1;
          this.pagination.maxRowFound = (this.pagination.currentPage === this.pagination.totalPage);
          this.setRowData();
      }
  }

  onPageNumberChanged(pageNumber: number) {
      if (pageNumber < 1) {
          this.pagination.currentPage = 1;
      } else {
          this.pagination.currentPage = pageNumber;
      }

      this.setRowData();
  }

  setRowData() {
      if (!this.enablePagination) {
          this.pagination.currentPage = null;
          this.pagination.pageSize = null;
      }
      this.getRows.emit(this.pagination);
  }

  setPager() {
      this.pagination.totalRowCount = (this.sourceData && this.sourceData.totalCount) ? this.sourceData.totalCount : (this.sourceData.data) ? this.sourceData.data.length : 0;
      this.pagination.totalPage = Math.ceil(this.pagination.totalRowCount / this.pagination.pageSize);

      const zeroBasedCurrentPage = (this.pagination.currentPage - 1);

      this.pagination.startRow = (this.pagination.pageSize * zeroBasedCurrentPage) + 1;
      this.pagination.endRow = (this.pagination.startRow + this.pagination.pageSize) - 1;

      if (this.pagination.maxRowFound && (this.pagination.endRow > this.pagination.totalRowCount)) {
          this.pagination.endRow = this.pagination.totalRowCount;
      }
  }
}
