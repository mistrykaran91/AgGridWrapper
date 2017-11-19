import { Component } from '@angular/core';
import { ICellEditorAngularComp } from "ag-grid-angular/main";
import { IAfterGuiAttachedParams, ICellEditorParams } from 'ag-grid/main';

@Component({
  selector: "editor-cell",
  template: `
      <select id="selectEditor" name="selectEditor" [(ngModel)]="currentValue"  >
      <option *ngFor="let value of list" [value]="resolveFields(value,'id')"> {{ resolveFields(value,'text') }} </option>
      </select>
  `
})
export class GridSelectComponent implements ICellEditorAngularComp {

  private params: any;
  private list: any;
  private columnDef: any;
  currentValue: any;

  agInit(params: ICellEditorParams): void {
    debugger;
    this.params = params;
    this.currentValue = params.value;
    this.columnDef = params.column.getColDef();
    this.list = this.resolvePath(this.columnDef.listField, params.context.parent);    
  }

  getValue() {
    // debugger;
    return this.currentValue;
  }

  resolveFields(value, source: any) {
    if (source === "id") {
      return this.resolvePath(this.columnDef.idField, value);
    }
    else {
      return this.resolvePath(this.columnDef.valueField, value);
    }

  }



  resolvePath(path, obj) {
    return path.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined
    }, obj || self)
  }
}
