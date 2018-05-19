import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs/observable/of";

@Injectable()
export class RemoteDataService {
  private url: string = "https://restcountries.eu/rest/v2/name/";

  constructor(private httpClient: HttpClient) {}

  fetchData(filter: any) {
    return this.httpClient.get(this.url + filter);
  }
}
