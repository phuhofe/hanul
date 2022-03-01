import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { lossDetailColumns } from '../models/loss-filter-column';
import {
  LossExpandedOriginal,
  LossOriginal,
} from '../models/loss-original.model';

@Injectable()
export class LossOriginService {
  constructor() {}

  getLostOriginData(isSort?: boolean) {
    const originData = this.generateOriginData(60);

    return of({
      tableData: originData,
      totalResult: originData.length,
    });
  }

  getLostOriginExpandedData() {
    const originData = this.generateExpandedData(30);

    return of({
      tableData: originData,
      totalResult: originData.length,
    });
  }

  getColumns() {
    return from(lossDetailColumns);
  }

  generateOriginData(length: number, isSort?: boolean): Array<LossOriginal> {
    if (isSort) {
      return Array.from({ length: length }, (_, k) =>
        this.createNewOrigin(k + 1)
      );
    }

    return Array.from({ length: length }, (_, k) =>
      this.createNewOrigin(k + 1, isSort)
    );
  }

  generateExpandedData(length: number): Array<LossExpandedOriginal> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewOriginExpandedData(k)
    );
  }

  createNewOrigin(id: number, isSort?: boolean): LossOriginal {
    return {
      original: {
        code: !isSort ? '000-' + id * 123 : '12123-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      product: {
        code: '000-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      loss: 1.32 * id,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      amountLoss: 12.1 * id,
      implementedDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      productMade: id * 1002,
    };
  }

  createNewOriginExpandedData(id: number): LossExpandedOriginal {
    return {
      productCode: `000-${id}`,
      implementedDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      ceaseDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      loss: id * 123,
      totalAmountLost: id * 15,
      totalCostLost: id * 32,
      totalProductMade: id * 10,
      serialNumber: ['1212-8734022347' + id, '1232-87120237'],
    };
  }
}
