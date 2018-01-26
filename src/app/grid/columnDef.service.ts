import { Injectable } from "@angular/core";
import { GridSelectComponent } from "./select.component";
import { GridPopoverComponent } from "./grid.popover.component";

export interface IColumnDefintionService {
  getColumnDefinition(key: string): any;
}

@Injectable()
export class ColumnDefintionService implements IColumnDefintionService {
  columnDefs: any;

  getColumnDefinition(key: string): any {
    switch (key) {
      case "data": {
        let genders: any = [];

        this.columnDefs = [
          {
            headerName: "#",
            checkboxSelection: true,
            pinned: true,
            width: 50
          },
          {
            headerName: "FirstName",
            field: "firstName",
            editable: true
          },
          {
            headerName: "LastName",
            field: "lastName",
            editable: true
          },
          {
            headerName: "Age",
            field: "age",
            editable: true
          },
          {
            headerName: "Gender",
            field: "gender",
            editable: true,
            listField: "ancillaries.genderList",
            idField: "id",
            valueField: "value",
            cellEditorFramework: GridSelectComponent
          },
          {
            headerName: "Skills",
            field: "skills",
            editable: true
          },
          {
            headerName: "Country",
            field: "country",
            editable: true,
            cellEditorFramework: GridPopoverComponent,
            popContent: "content"
          },
          {
            headerName: "Continent",
            field: "continent",
            editable: true
          }
        ];
        break;
      }
    }
    return this.columnDefs;
  }
}
