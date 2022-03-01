
import { Injectable } from '@angular/core';
import { of } from 'rxjs'

import { CostPriceExpandedSold, CostPriceSold } from '../models/cost-price-sold.model';

@Injectable()
export class CostPriceSoldService {
  constructor() {}

  getCostPriceSoldData() {
    const detailData = this.generateSoldData(25);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getExpandedData() {
    const detailData = this.generateExpandedData(5);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  // getColumns() {
  //   return from(lossDetailColumns);
  // }

  generateSoldData(length: number): Array<CostPriceSold> {
    return Array.from({ length: length }, (_, k) => this.createNewSold(k));
  }

  generateExpandedData(length: number): Array<CostPriceExpandedSold> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewSoldExpandedData(k)
    );
  }

  createNewSold(id: number): CostPriceSold {
    return {
      id: id,
      serialCode: '000-' + id * 123,
      code: '000-' + id * 12,
      name: 'Coles',
      origin: 'Spain',
      box: id + 1,
      kg: id * 2 + 'kg',
      q: id * 3,
      unitPrice: id + 5,
      totalPrice: id + 1,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      date: new Date(),
      customer: '우성식품',
      receivable: id + 2,
      tax: 'no Tax',
      category: 'Expense',
    };

  }

  createNewSoldExpandedData(index: number): CostPriceExpandedSold {
    return {
      id: index,
      serialCode: '000-' + index * 123,
      code: '000-' + index * 12,
      name: 'Coles',
      origin: 'Spain',
      box: index + 1,
      kg: index * 2 + 'kg',
      q: index * 3,
      unitPrice: index + 5,
      totalPrice: index + 1,
      branch: index % 2 === 0 ? 'Jeju' : 'Busan',
      date: new Date(),
      customer: '우성식품',
      receivable: index + 2,
      tax: 'no Tax',
      category: 'Expense',
    }
  }
}