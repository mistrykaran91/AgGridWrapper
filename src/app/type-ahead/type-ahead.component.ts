import { Component, Input, forwardRef, EventEmitter, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

import * as _ from 'lodash';

import { Pagination } from './../grid/grid.models';
import { UtilService } from './../services/util.service';

@Component({
  moduleId: module.id,
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeAheadComponent),
    multi: true
  }]
})
export class TypeAheadComponent implements ControlValueAccessor, OnInit {

  pagination: Pagination = new Pagination();
  onChange: any = () => { };
  onTouched: any = () => { };
  isSelected: boolean = false;

  searching = false;
  searchFailed = false;
  minCharacter: number = 2;

  @Input("data") _data: any;

  @Input() property: any;
  @Input() service: any;
  @Input() placeholder = 'Type to search...';
  @Input() currentFilter: any = {};
  @Input() ancillaryCode: string;
  @Input() restrict: string = "alphanum";
  @Input() displayformatter: any;
  @Input() disabled: boolean = false;
  @Input() control: FormControl;
  @Input() isDirectResult: boolean = false;
  @Input() staticList: Array<any> = new Array<any>();

  @Input('ngModel') formControl: any;
  @Input('ngModelChange') ngModelChange = new EventEmitter<any>();

  @Output() selectItemEvent: EventEmitter<any> = new EventEmitter<any>();

  get data() {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.ngModelChange.emit(this.formControl);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term => (term === '' || term.length < this.minCharacter) ? [] : this.searchCallback(term))
      .do(() => this.searching = false);

  searchCallback(term) {
    // debugger;
    const criteria = { '$regex': '(?i).*' + term + '.*' };
    this.pagination.pageSize = 100;
    if (this.currentFilter) {
      // this.currentFilter = this.utilService.removeNull(this.currentFilter);
      this.pagination.filter = this.currentFilter;
    }

    if (_.isArray(this.property)) {
      const filters: Array<any> = new Array<any>();

      _.each(this.property, (prop) => {
        filters.push({ [prop]: criteria });
      });

      this.pagination.filter["$or"] = filters;

    } else {
      this.pagination.filter[this.property] = criteria;
    }

    if (this.ancillaryCode) {
      return this.service(this.ancillaryCode, {}, this.pagination)
        .do(() => this.searchFailed = false)
        .catch(() => {
          this.searchFailed = true;
          return Observable.of([]);
        })
    } else {
      return this.service(term)
        .do((data: Array<any>) => {
          // debugger;
          if (this.staticList && this.staticList.length > 0) {
            data.unshift(...this.staticList);
          }

          this.searchFailed = false
        })
        .catch(() => {
          this.searchFailed = true;
          return Observable.of([]);
        })
    }
  }

  onSelectItem(data: any) {

    if (!this.utilService.isNullOrUndefined(this.control)) {
      if (!this.utilService.isNullOrUndefined(this.control)) {
        this.control.setErrors(null);
      }
    }
    this.isSelected = true;
    this.selectItemEvent.emit(data);

  }

  // onBlur() {
  //   if (!this.isSelected && this._data !== '') {
  //     if (!this.utilService.isNullOrUndefined(this.control)) {
  //       this.control.setErrors({ 'incorrect': true });
  //     }
  //     this.utilService.markAsTouched(this.control);
  //   } else {
  //     if (!this.utilService.isNullOrUndefined(this.control)) {
  //       this.control.setErrors(null);
  //     }

  //   }

  //   this.isSelected = false;
  // }

  formatter = (item: any) => {
    // debugger;
    if (this.displayformatter && item) {
      return eval(this.displayformatter) || this.data;
    }
    else {
      return (this.property) ? _.get(item, this.property) || item || this.data : item;
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.data = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  getProperty = (item: any) => {
    debugger;
    if (this.displayformatter && item) {
      return eval(this.displayformatter);
    }
    return _.get(item, this.property) || item;
  }

  get isDisabled() {
    if (this.disabled) {
      return true;
    }
    return undefined;
  }
}
