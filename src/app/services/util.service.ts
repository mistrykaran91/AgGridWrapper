import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {

  constructor() { }

  isNullOrUndefined(obj: any) {
    return (obj === null || obj === undefined || obj === '');
  }

}
