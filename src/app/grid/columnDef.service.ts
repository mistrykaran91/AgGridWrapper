import { Injectable } from '@angular/core';

export interface IColumnDefintionService {
  getColumnDefinition(key: string): any;
}

@Injectable()
export class ColumnDefintionService implements IColumnDefintionService {

  columnDefs: any;

  getColumnDefinition(key: string): any {
    switch (key) {
      case "data":
        {
          this.columnDefs = [
            {
              headerName: "#", checkboxSelection: true, pinned: true, width: 50
            },
            {
              headerName: "FirstName", field: "firstName"
            },
            {
              headerName: "LastName", field: "lastName"
            },
            {
              headerName: "Gender", field: "gender"
            },
            {
              headerName: "Skills", field: "skills"
            },
            {
              headerName: "Country", field: "country"
            },
            {
              headerName: "Continent", field: "continent"
            }
          ];
          break;
        }
    }
    return this.columnDefs;
  }
}
