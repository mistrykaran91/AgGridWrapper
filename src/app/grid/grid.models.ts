import { GridSettingsConstants } from './grid-settings.constants';
import { ColDef, ColGroupDef } from 'ag-grid';

export class Pagination {
    currentPage?: number = GridSettingsConstants.defaultCurrentPage;
    pageSize?: number = GridSettingsConstants.defaultPageSize;
    totalPage?: number;
    totalRowCount?: number;
    startRow?: number;
    endRow?: number;
    maxRowFound?: boolean = GridSettingsConstants.defaultMaxRowFound;
    select?: any = null;
    filter?: any = null;
    sort?: any = null;
    workflow?= false;

    constructor(all?: boolean) {
        if (all) {
            this.currentPage = null;
            this.pageSize = null;
        }
    }
}

export interface ColumnDefinition extends ColDef {
    buttons?: any;
    children?: (ColumnDefinition | ColGroupDef)[];
    listField?: any;
    idField?: any;
    valueField?: any;

}
