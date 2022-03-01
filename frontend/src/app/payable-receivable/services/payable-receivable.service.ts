import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class PayableReceivableService {
  $searchKey = new BehaviorSubject('');

  constructor() {}

  search(searchKey: any) {
    this.$searchKey.next(searchKey);
  }

  getPayableData() {
    return of({
      tableData: [
        {
          id: 1,
          supplier: 'A',
          code: '0001-2',
          amountBought: 1200000,
          amountPaid: 800000,
          amountOwe: 290000,
          lastEdited: new Date(),
          branch: 'Busan',
        },
        {
          id: 2,
          supplier: 'B',
          code: '0001-2',
          amountBought: 1200000,
          amountPaid: 800000,
          amountOwe: 290000,
          lastEdited: new Date(),
          branch: 'Busan',
        },
        {
          id: 3,
          supplier: 'C',
          code: '0001-2',
          amountBought: 1200000,
          amountPaid: 800000,
          amountOwe: 290000,
          lastEdited: new Date(),
          branch: 'Busan',
        },
        {
          id: 4,
          supplier: 'D',
          code: '0001-2',
          amountBought: 1200000,
          amountPaid: 800000,
          amountOwe: 290000,
          lastEdited: new Date(),
          branch: 'Busan',
        },
        {
          id: 5,
          supplier: 'E',
          code: '0001-2',
          amountBought: 1200000,
          amountPaid: 800000,
          amountOwe: 290000,
          lastEdited: new Date(),
          branch: 'Busan',
        },
      ],
      totalResult: 5,
    });
  }

  getPayableExpandedData() {
    return of({
      tableData: [
        {
          id: 1,
          tax: 'Non',
          amountBought: '',
          amountPaid: '800000',
          amountOwe: '400000',
          date: new Date(),
          method: 'Bank transfer',
        },
        {
          id: 2,
          tax: 'Non',
          amountBought: '1200000',
          amountPaid: '',
          amountOwe: '1200000',
          date: new Date(),
          method: 'cash',
        }
      ]
    })
  }
}
