import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LossService {

  $searchKey = new BehaviorSubject('');

  constructor() {}

  search(searchKey: any) {
    this.$searchKey.next(searchKey);
  }
}
