import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid/main";
import { RefData } from "./data/refData";
import { HttpClient } from "@angular/common/http";
import { RemoteDataService } from "./data/remote-data.service";
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
  service: Function;
  ancillaries = {
    genderList: []
  };

  items: any;
  mainForm: any;

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
      country: [""]
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

    if (filter === "") {
      filter = "nor";
    }

    this.remoteService.fetchData(filter);
  }
}
