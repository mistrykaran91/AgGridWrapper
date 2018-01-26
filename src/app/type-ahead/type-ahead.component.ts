import {
  OnInit,
  SimpleChanges,
  Component,
  OnChanges,
  Input
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

@Component({
  moduleId: module.id,
  selector: "type-ahead",
  templateUrl: "./type-ahead.component.html",
  styles: [`.form-control { width: 300px; display: inline; }`]
})
export class TypeAHeadComponent implements OnChanges, OnInit {
  @Input() data: any;
  @Input() service: Function;
  @Input() placeholder: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  public model: any;
  public searching = false;
  public searchFailed = false;

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
}
