
import { Injectable } from '@angular/core';

import { of } from 'rxjs'

import { PayableReceivableComparative } from '../models/payable-receivable-comparative.model';


@Injectable()
export class PayableReceivableComparativeService {
  constructor() {}

  getComparativeData() {
    const detailData = this.generateComparativeData(10);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  generateComparativeData(length: number): Array<PayableReceivableComparative> {
    return Array.from({ length: length }, (_, k) => this.createNewComparative(k));
  }


  createNewComparative(id: number): PayableReceivableComparative {
    return {
      id: id,
      totalAmountPayable: id * 3,
      amountPayed: id * 5,
      amountBought:  id * 15,
      date: new Date(),
      amountSold: id * 12,
      amountReceived:  id * 7,
      totalAmountReceivable:  id * 8,
      branch: 'Busan',
    };

  }

}