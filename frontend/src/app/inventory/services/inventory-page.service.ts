import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

import { environment } from '@environments/environment';

import { EditInventory } from '../models/inventory.model';
import { TableType } from '../models/inventory.enum';
import {
  comparativeTableColumns,
  detailTableColumns,
  historyTableColumns,
  totalTableColumns,
} from '../models/column-filter';

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Injectable()
export class InventoryPageService {
  inventoryEndpoint = 'logistics/inventory';
  $searchKey = new BehaviorSubject('');

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  search(searchKey: any) {
    this.$searchKey.next(searchKey);
  }

  getInventoryTable() {
    return this.http
      .get(`${environment.apiNewUrl}${this.inventoryEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  searchInventoryTable(keyword: string) {
    let params = new HttpParams();
    params = params.append('product_search', keyword);

    return this.http
      .get(`${environment.apiNewUrl}${this.inventoryEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortInventoryTable(sort: Sort, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('sort_field', sort.active);
    params = params.append('sort_order', sort.direction);

    if (searchParam) {
      const startDate: string = new DatePipe('en-US').transform(
        searchParam.start_date,
        'yyyy-MM-dd'
      ) as string;

      const endDate: string = new DatePipe('en-US').transform(
        searchParam.end_date,
        'yyyy-MM-dd'
      ) as string;

      if (searchParam.product_search) {
        params = params.append('product_search', searchParam.product_search);
      }

      if (startDate) {
        params = params.append('start_date', startDate);
      }

      if (endDate) {
        params = params.append('end_date', endDate);
      }
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.inventoryEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  changePageInventoryTable(page: PageEvent, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('page_size', page.pageSize);
    params = params.append('page_no', page.pageIndex);

    if (searchParam) {
      const startDate: string = new DatePipe('en-US').transform(
        searchParam.start_date,
        'yyyy-MM-dd'
      ) as string;

      const endDate: string = new DatePipe('en-US').transform(
        searchParam.end_date,
        'yyyy-MM-dd'
      ) as string;

      if (searchParam.product_search) {
        params = params.append('product_search', searchParam.product_search);
      }

      if (startDate) {
        params = params.append('start_date', startDate);
      }

      if (endDate) {
        params = params.append('end_date', endDate);
      }
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.inventoryEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  updateInventory(inventory: EditInventory) {
    return this.http.put(
      `${environment.apiNewUrl}${this.inventoryEndpoint}/${inventory.stock_id}`,
      inventory
    );
  }

  addInventory(inventory: EditInventory) {
    return this.http.post(
      `${environment.apiNewUrl}${this.inventoryEndpoint}`,
      inventory
    );
  }

  deleteInventory(stock_id: number) {
    return this.http
      .delete(`${environment.apiNewUrl}${this.inventoryEndpoint}/${stock_id}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  filterInventory(param: any) {
    let params = new HttpParams();

    const startDate: string = new DatePipe('en-US').transform(
      param.start_date,
      'yyyy-MM-dd'
    ) as string;

    const endDate: string = new DatePipe('en-US').transform(
      param.end_date,
      'yyyy-MM-dd'
    ) as string;

    if (param.product_search) {
      params = params.append('product_search', param.product_search);
    }

    if (startDate) {
      params = params.append('start_date', startDate);
    }

    if (endDate) {
      params = params.append('end_date', endDate);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.inventoryEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  getTotalTableData() {
    const users = this.generateData(20, 'user');
    return of({
      tableData: users,
      totalResult: users.length,
    });
  }

  getDetailTableData() {
    const detailData = this.generateData(21);
    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getComparativeTableData() {
    const detailData = this.generateData(31, 'comparative');
    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getHistoryTableData() {
    const detailData = this.generateData(15);
    return of({
      tableData: detailData,
      totalResult: detailData.length,
    });
  }

  getTableFilterColumns(tableType: TableType) {
    const dataMap = new Map([
      [TableType.TOTAL, totalTableColumns],
      [TableType.DETAIL, detailTableColumns],
      [TableType.HISTORY, comparativeTableColumns],
      [TableType.COMPARATIVE, historyTableColumns],
    ]);

    return of(dataMap.get(tableType));
  }

  generateData(length: number, type?: string) {
    if (type && type === 'comparative') {
      return Array.from({ length: length }, (_, k) =>
        this.createNewComparative(k + 1)
      );
    }

    if (type) {
      return Array.from({ length: length }, (_, k) =>
        this.createNewUser(k + 1)
      );
    }

    return Array.from({ length: length }, (_, k) =>
      this.createNewDetail(k + 1)
    );
  }

  createNewUser(id: number) {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      code: '000-' + id * 123,
      name: name,
      origin: id % 2 === 0 ? 'Spain' : 'Korea',
      box: id,
      kg: 1 * id + 'kg',
      total_cost: 1000 * id,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
    };
  }

  createNewDetail(id: number) {
    return {
      code: '000-' + id * 123,
      name: id % 2 === 0 ? 'Beef' : 'Pork',
      dom_int: id % 2 === 0 ? 'Dom' : 'Int',
      origin: id % 2 === 0 ? 'Spain' : 'Korea',
      grade: id % 2 === 0 ? 'A+' : '',
      dateBought: new Date(),
      dateSold: new Date(),
      box: id % 2 === 0 ? 1 : '',
      kg: 1 * id + 'kg',
      cost: 1 * id + 'kg',
      total_cost: 1000 * id,
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
      serialNumber: id % 2 === 0 ? 'Jeju' : 'Busan',
      supplierName: id % 2 === 0 ? 'Jeju' : 'Busan',
    };
  }

  createNewComparative(id: number) {
    return {
      code: '000-' + id * 123,
      name: id % 2 === 0 ? 'Beef' : 'Pork',
      dom_int: id % 2 === 0 ? 'Dom' : 'Int',
      origin: id % 2 === 0 ? 'Spain' : 'Korea',
      grade: id % 2 === 0 ? 'A+' : '',
      dateBought: new Date(),
      yesterday: {
        box: id % 2 === 0 ? 1 : '',
        kg: 1 * id + 'kg',
      },
      difference: {
        box: id % 2 === 0 ? 1 : '',
        kg: 1 * id + 'kg',
      },
      today: {
        box: id % 2 === 0 ? 1 : '',
        kg: 1 * id + 'kg',
      },
      branch: id % 2 === 0 ? 'Jeju' : 'Busan',
    };
  }
}
