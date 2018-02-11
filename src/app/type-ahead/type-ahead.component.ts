import {
  OnInit,
  SimpleChanges,
  Component,
  OnChanges,
  Input,
  forwardRef,
  EventEmitter,
  Output
} from "@angular/core";
import { RefData } from "../data/refData";

import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/merge";
import { HttpClient } from "@angular/common/http";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "type-ahead",
  templateUrl: "./type-ahead.component.html",
  styles: [`.form-control { width: 300px; display: inline; }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeAHeadComponent),
      multi: true
    }
  ]
})
export class TypeAHeadComponent implements ControlValueAccessor, OnInit {
  @Input("data") _data = "";

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input("ngModel") ngModel: any;
  @Input("ngModelChange") ngModelChange = new EventEmitter<any>();

  get data() {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.onChange(value);
    this.onTouched();
  }

  public searching = false;
  public searchFailed = false;

  @Input() service: Function;
  @Input() placeholder: string;

  constructor() {}

  public hideSearchingWhenUnsubscribed = new Observable(() => () =>
    (this.searching = false)
  );

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searching = true))
      .switchMap(term =>
        this.service(term)
          .do(() => (this.searchFailed = false))
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          })
      )
      .do(() => (this.searching = false))
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: any) => x.name;

  writeValue(obj: any): void {
    if (obj) {
      this.data = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.ngModelChange.emit(this.ngModel);
  }
}
