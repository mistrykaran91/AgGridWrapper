import { UtilService } from './services/util.service';
import { PaginationToolbarComponent } from './grid/pagination-toolbar/pagination-toolbar.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';
import { RemoteDataService } from './services/remote-data.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ColumnDefintionService } from "./grid/columnDef.service";
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap/typeahead/highlight';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridSelectComponent,
    GridPopoverComponent,
    PaginationToolbarComponent,
    TypeAheadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([GridSelectComponent, GridPopoverComponent]),
    NgbPopoverModule.forRoot(),
    NgbTypeaheadModule.forRoot()    
  ],
  providers: [ColumnDefintionService, RemoteDataService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
