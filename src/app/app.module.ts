import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";

import { GridComponent } from "./grid/grid.component";
import { AppComponent } from "./app.component";
import { GridSelectComponent } from "./grid/select.component";
import { GridPopoverComponent } from "./grid/grid.popover.component";
import { TypeAHeadComponent } from "./type-ahead/type-ahead.component";
import { RemoteDataService } from "./data/remote-data.service";
import { ColumnDefintionService } from "./grid/columnDef.service";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridSelectComponent,
    GridPopoverComponent,
    TypeAHeadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([GridSelectComponent, GridPopoverComponent]),
    NgbPopoverModule.forRoot(),
    NgbTypeaheadModule.forRoot()
  ],
  providers: [ColumnDefintionService, RemoteDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
