import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-toolbar',
  templateUrl: './pagination-toolbar.component.html'
})
export class PaginationToolbarComponent implements OnInit {

  @Input() pagination;
  @Input() rowsPerPage;

  @Output() previousClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageSizeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageNumberChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.previousClick = new EventEmitter();
    this.nextClick = new EventEmitter();
    this.pageSizeChanged = new EventEmitter();
  }

  ngOnInit() {

  }

  onPreviousClick() {
    this.previousClick.emit();
  }

  onNextClick() {
    this.nextClick.emit();
  }

  onPageSizeChanged() {
    this.pageSizeChanged.emit();
  }

  pageExists(page) {
    return page <= this.pagination.totalPage;
  }

  onPageNumberChanged(pageNumber: number) {
    this.pageNumberChanged.emit(pageNumber);
  }
}
