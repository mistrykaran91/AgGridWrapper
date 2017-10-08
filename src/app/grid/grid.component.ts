import { RefData } from './../data/refData';
import { debounce } from 'rxjs/operator/debounce';
import { GridSettingsConstants } from './gridSettings.const';
import { ColumnApi, GridApi, GridOptions, IDatasource, simpleHttpRequest } from 'ag-grid/main';
import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { ColumnDefintionService, IColumnDefintionService } from './columnDef.service';

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html"
})
export class GridComponent implements OnInit, OnChanges {

  protected columnDefs: any;
  private gridApi: GridApi = null;
  private columnApi: ColumnApi = null;

  @Input('column-definition-key') columnDefinitionKey: string;
  @Input('column-definition-service') columnDefinitionService: IColumnDefintionService;
  @Input('rowData') rowData: any;
  @Input('loadData') loadData: any;

  @Input('enableFilter') enableFilter: boolean = (!this.enableFilter) ? GridSettingsConstants.enableFilter : this.enableFilter;
  @Input('enableSorting') enableSorting: boolean = (!this.enableSorting) ? GridSettingsConstants.enableSorting : this.enableSorting;
  @Input('enableColResize') enableColResize: boolean = (!this.enableColResize) ? GridSettingsConstants.enableColResize : this.enableColResize;
  @Input('rowSelection') rowSelection: string = (!this.rowSelection) ? GridSettingsConstants.rowSelection : this.rowSelection;
  @Input('enablePagination') enablePagination: boolean = (!this.enablePagination) ? GridSettingsConstants.enablePagination : this.enablePagination;

  @Output('gridReady') gridReady = new EventEmitter();
  @Output('rowSelected') rowSelected = new EventEmitter();

  gridOptions: GridOptions;

  constructor() { }

  ngOnInit() {
    this.columnDefs = this.columnDefinitionService.getColumnDefinition(this.columnDefinitionKey);
    this.configureGridSettings();
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple.loadData.currentValue === true) {
      this.setRowData();
    }
  }

  configureGridSettings(): void {

    this.gridOptions = {

      enableFilter: this.enableFilter,
      enableSorting: this.enableSorting,
      enableColResize: this.enableColResize,
      rowSelection: this.rowSelection,
      rowHeight: GridSettingsConstants.rowHeight,

      // pagination: this.enablePagination,
      paginationPageSize: GridSettingsConstants.defaultPageSize,

      onRowSelected: this.onRowSelected,
      //onGridReady: this.onReady,
      rowModelType: "infinite",
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 2,
      infiniteInitialRowCount: 1,
      maxBlocksInCache: 2,
      cacheBlockSize: 5

    };
  }

  onReady(params: any): any {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridReady.emit(true);
    //this.setRowData();
  }

  onRowSelected(): any {
    debugger;
  }

  onPageSizeChanged(newPageSize: number): void {
    this.gridApi.paginationSetPageSize(newPageSize);
  }

  setRowData(): void {
    debugger
    var dataSource: IDatasource = {
      rowCount: null,

      getRows: (params) => {
        debugger;

        console.log('Asking for ' + params.startRow + ' to ' + params.endRow);

        setTimeout(() => {
          debugger;
          var rows = RefData.Data.splice(params.startRow, params.endRow);

          var lastRow = -1;

          if (18 <= params.endRow) {
            lastRow = RefData.Data.length;
          }

          params.successCallback(rows, lastRow);

        }, 1500);
      }
    };

    this.gridApi.setDatasource(dataSource);
  }
}
