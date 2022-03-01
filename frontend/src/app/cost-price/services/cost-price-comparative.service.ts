
import { Injectable } from '@angular/core';
import { of } from 'rxjs'

import { CostPriceComparative } from '../models/cost-price-comparative.model';

@Injectable()
export class CostPriceComparativeService {
  constructor() {}

  getCostPriceComparativeData() {
    const detailData = this.generateComparativeData(15);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  generateComparativeData(length: number): Array<CostPriceComparative> {
    return Array.from({ length: length }, (_, k) => this.createNewComparative(k));
  }


  createNewComparative(id: number): CostPriceComparative {
    return {
      id: id,
      totalCostGoodsBought: id + 1,
      date:  new Date(),
      totalCostGoodsSold: id + 3,
    };

  }

}