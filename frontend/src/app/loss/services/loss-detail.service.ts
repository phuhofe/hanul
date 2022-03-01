import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { LossDetail, LossExpandedDetail } from '../models/loss-detail.model';
import { lossDetailColumns } from '../models/loss-filter-column';

@Injectable()
export class LossDetailService {
  constructor() {}

  getLostDetailData(isSort?: boolean) {
    const detailData = this.generateDetailData(20, isSort);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getLostDetailExpandedData() {
    const detailData = this.generateExpandedData(30);

    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getColumns() {
    return from(lossDetailColumns);
  }

  generateDetailData(length: number, isSort?: boolean): Array<LossDetail> {
    if (isSort) {
      return Array.from({ length: length }, (_, k) => this.createNewDetail(k, isSort));
    }

    return Array.from({ length: length }, (_, k) =>
      this.createNewDetail(k)
    );

  }

  generateExpandedData(length: number): Array<LossExpandedDetail> {
    return Array.from({ length: length }, (_, k) =>
      this.createNewDetailExpandedData(k)
    );
  }

  createNewDetail(id: number, isSort?: boolean): LossDetail {
    return {
      id: id,
      original: {
        code: !isSort ? '000-' + id * 123 : '111-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      product: {
        code: '000-' + id * 123,
        name: id % 2 === 0 ? 'Beef' : 'Pork',
        origin: id % 2 === 0 ? 'Spain' : 'Korea',
      },
      loss: 1.5 * id,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      amountLost: 12 * id,
      implementedDate: new Date(),
      productMade: id * 1002,
    };
  }

  createNewDetailExpandedData(index: number): LossExpandedDetail {
    return {
      implementedDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      ceaseDate: new DatePipe('en-US').transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      ) as string,
      loss: index * 2.9,
      totalAmountLost: index * 103,
      totalCost: index * 10000,
      totalProductMade: index * 133,
      serialNumber: ['1232-87120237', '1232-87120237'],
    };
  }
}
