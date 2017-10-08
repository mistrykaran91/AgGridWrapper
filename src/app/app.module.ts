import { ColumnDefintionService } from './grid/columnDef.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule  } from "ag-grid-angular";

import { GridComponent } from './grid/grid.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([

    ])
  ],
  providers: [
    ColumnDefintionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
