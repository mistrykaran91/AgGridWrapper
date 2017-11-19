import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { RefData } from "./data/refData";
import { ColumnDefintionService, IColumnDefintionService } from './grid/columnDef.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  rowData: any;
  loadData: boolean = false;
  columnDefintionService: IColumnDefintionService = new ColumnDefintionService();

  ancillaries = {
    genderList: []
  }

  // genderList: Array<any> = new Array<any>();

  constructor() {
    this.rowData = RefData.Data;

    this.ancillaries.genderList.push({ id: "M", value: "Male" });
    this.ancillaries.genderList.push({ id: "F", value: "Female" });

    // this.genderList = ["Male", "Female"];
  }

  ngOnInit() { }

  onRowSelected(selectedRow: any) {
    console.log(selectedRow.node.data);
  }

  onReady(data: any) {
    this.loadData = true;
    console.log(data);
  }

}
