import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CostPriceService {

  $searchKey = new BehaviorSubject('');

  constructor() {}

  search(searchKey: any) {
    this.$searchKey.next(searchKey);
  }
}
