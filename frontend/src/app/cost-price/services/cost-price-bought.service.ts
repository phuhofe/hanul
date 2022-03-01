
import { Injectable } from '@angular/core';
import { of } from 'rxjs'

import { CostPriceBought, CostPriceExpandedBought } from '../models/cost-price-bought.model';

@Injectable()
export class CostPriceBoughtService {
  constructor() {}

  getCostPriceBoughtData() {
    const detailData = this.generateBoughtData(20);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getCostPriceBoughtExpandedData() {
    const detailData = this.generateExpandedData(20);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  // getColumns() {
  //   return from(lossDetailColumns);
  // }

  generateBoughtData(length: number): Array<CostPriceBought> {
    return Array.from({ length: length }, (_, k) => this.createNewBought(k));
  }

  generateExpandedData(length: number): Array<CostPriceExpandedBought> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewBoughtExpandedData(k)
    );
  }

  createNewBought(id: number): CostPriceBought {
    return {
      id: id,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      date: new Date(),
      serialCode: '000-' + id * 123,
      code: '000-' + id * 12,
      name: 'Coles',
      origin: 'Spain',
      box: id + 1,
      kg: id * 2 + 'kg',
      q: id * 3,
      unitCost: id + 5,
      totalCost: id + 1,
      supplier: '우성식품',
      amountOwe: id + 2,
      tax: 'no Tax',
      category: 'Expense',
    };
  }

  createNewBoughtExpandedData(index: number): CostPriceExpandedBought {
    return {
      id: index,
      branch: index % 2 === 0 ? 'Jeju' : 'Busan',
      date: new Date(),
      serialCode: '000-' + index * 123,
      code: '000-' + index * 12,
      name: 'Coles',
      origin: 'Spain',
      box: index + 1,
      kg: index * 2 + 'kg',
      q: index * 3,
      unitCost: index + 5,
      totalCost: index + 1,
      supplier: '우성식품',
      amountOwe: index + 2,
      tax: 'no Tax',
      category: 'Expense',
    }
  }
}