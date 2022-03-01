import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { from, of } from 'rxjs';

import { lossDetailColumns } from '../models/loss-filter-column';
import { LossExpandedProduct, LossProduct } from '../models/loss-product.model';

@Injectable()
export class LossProductService {

  constructor() {}

  getLostProductData() {
    const productData = this.generateProductData(20);

    return of({
      tableData: productData,
      totalResult: productData.length,
    });
  }

  getLostProductExpandedData() {
    const productData = this.generateExpandedData(5);
    
    return of({
      tableData: productData,
      totalResult: productData.length,
    });
  }

  getColumns() {
    return from(lossDetailColumns);
  }
  
  generateProductData(length: number): Array<LossProduct> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewProduct(k)
    );
  }
  
  generateExpandedData(length: number): Array<LossExpandedProduct> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewProductExpandedData(k)
    );
  }

  createNewProduct(id: number): LossProduct {
    return {
      id: id,
      original: {
        code: '000-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      product: {
        code: '000-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      loss: 1.32,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      amountLost: 12.1,
      implementedDate: new Date(),
      productMade: id * 1002,
    };
  }

  createNewProductExpandedData(id: number): LossExpandedProduct {
    return {
      originalCode: `000-${id}`,
      implementedDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      ceaseDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      loss: 2.9,
      totalAmountLost: 103,
      totalCostLost: 120000,
      totalProductMade: 1233,
      serialNumber: [
        '1232-87120237',
        '1232-87120237',
      ]
    }
  }
}
