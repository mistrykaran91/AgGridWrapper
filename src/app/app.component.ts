import { RemoteDataService } from './services/remote-data.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid/main";
import { RefData } from "./data/refData";
import { HttpClient } from "@angular/common/http";

import {
  ColumnDefintionService,
  IColumnDefintionService
} from "./grid/columnDef.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  rowData: any;
  loadData: boolean = false;
  columnDefintionService: IColumnDefintionService = new ColumnDefintionService();
  name: string = "Test";

  @ViewChild("popContent") content;
  ancillaries = {
    genderList: []
  };

  items: any;
  mainForm: any;

  service: Function;
  property: string = 'name';

  constructor(
    private remoteService: RemoteDataService,
    private fb: FormBuilder
  ) {
    this.service = this.remoteService.fetchData.bind(this.remoteService);

    this.rowData = RefData.Data;
    this.ancillaries.genderList.push({ id: "M", value: "Male" });
    this.ancillaries.genderList.push({ id: "F", value: "Female" });
    // this.genderList = ["Male", "Female"];
  }

  ngOnInit() {
    this.mainForm = this.fb.group({
      country: ["India"]
    });
  }

  onRowSelected(selectedRow: any) {
    console.log(selectedRow.node.data);
  }

  onReady(data: any) {
    this.loadData = true;
    console.log(data);
  }

  getRows(filter: string = "") {
    debugger;

    // if (filter === "") {
    //   filter = "id";
    // }

    // this.remoteService.fetchData(filter);
    return RefData.Data;
  }

  onSelectItem(data: any) {
    debugger;
  }
}
