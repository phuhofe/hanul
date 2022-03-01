import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class MartProductService {

  public dataSubject = new Subject();

  constructor() { }

  dataChange(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    this.dataSubject.subscribe();
  }
}
