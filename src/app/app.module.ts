import { FormsModule } from '@angular/forms';
import { ColumnDefintionService } from './grid/columnDef.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from "ag-grid-angular";

import { GridComponent } from './grid/grid.component';
import { AppComponent } from './app.component';
import { GridSelectComponent } from './grid/select.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridSelectComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([
      GridSelectComponent
    ]),
    FormsModule
  ],
  providers: [
    ColumnDefintionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
