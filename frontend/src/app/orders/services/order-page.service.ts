import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StatusMap } from '@app/app.config';
import { environment } from '@environments/environment';
import { EditOrder } from '../models/mart-product.model';

@Injectable()
export class OrderPageService {
  orderEndpoint = 'logistics/orders';
  countEndpoint = 'logistics/orders/counts';
  updatedOrder$ = new BehaviorSubject('');

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  update() {
    this.updatedOrder$.next('updating');
  }

  getAllOrder() {
    return this.http.get(`${environment.apiNewUrl}${this.orderEndpoint}`).pipe(
      map((res: any) => {
        return {
          tableData: res.table_data,
          totalResult: res.total_results,
        };
      })
    );
  }

  getProductCount() {
    return this.http.get(`${environment.apiNewUrl}${this.countEndpoint}`).pipe(
      map((res: any) => {
        const groups = res.reduce((groups: any, item: any) => {
          const statusMap = new Map([
            [StatusMap.NEW, 'new'],
            [StatusMap.TODAY, 'today'],
            [StatusMap.KEEP, 'keep'],
            [StatusMap.INCOMPLETE, 'incomplete'],
            [StatusMap.PROCESSING, 'processing'],
            [StatusMap.COMPLETE, 'complete'],
          ]);

          const status: any = statusMap.get(item.status);

          return {
            ...groups,
            [item.type]: {
              ...(groups[item.type] || []),
              [status]: item.count,
            },
          };
        }, {});
        return groups;
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  filterProductTable(type: string, status?: string) {
    let params = new HttpParams();
    params = params.append('order_type', type);

    if (status || status?.length !== 0) {
      const statusMap = new Map([
        ['new', StatusMap.NEW],
        ['today', StatusMap.TODAY],
        ['keep', StatusMap.KEEP],
        ['incomplete', StatusMap.INCOMPLETE],
        ['processing', StatusMap.PROCESSING],
        ['complete', StatusMap.COMPLETE],
      ]);
      const convertStatus = statusMap.get(status as string);

      params = params.append('status', convertStatus as string);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.orderEndpoint}`, {
        params: params,
      })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortProductTable(tableType: string, sortField: string, sortOrder: string) {
    let params = new HttpParams();
    params = params.append('order_type', tableType);
    params = params.append('sort_field', sortField);
    params = params.append('sort_order', sortOrder);

    return this.http
      .get(`${environment.apiNewUrl}${this.orderEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  filterProductByDate(productType: string, param: any) {
    let params = new HttpParams();

    const startDate: string = new DatePipe('en-US').transform(
      param.start_date,
      'yyyy-MM-dd'
    ) as string;

    const endDate: string = new DatePipe('en-US').transform(
      param.end_date,
      'yyyy-MM-dd'
    ) as string;

    params = params.append('order_type', productType);

    if (param.customer) {
      params = params.append('customer', param.customer);
    }

    if (startDate) {
      params = params.append('start_date', startDate);
    }

    if (endDate) {
      params = params.append('end_date', endDate);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.orderEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  filterProductByCustomName(productType: string, param: any) {
    let params = new HttpParams();
    params = params.append('order_type', productType);
    params = params.append('customer', param.customer);

    return this.http
      .get(`${environment.apiNewUrl}${this.orderEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  addProduct(data: any) {
    return this.http
      .post(`${environment.apiNewUrl}${this.orderEndpoint}`, data)
      .pipe(
        tap(() => this.updatedOrder$.next('updated')),
        catchError((err) => {
          this.openSnackBar(err.statusText);
          return throwError(err);
        })
      );
  }

  editProduct(data: any, type?: string) {
    const editData: EditOrder = {
      order_id: data.order_id,
      order_no: data.order_no,
      status: data.status,
      completed: data.completed,
      order_units: data.order_units,
      deleted_order_units: data.deleted_order_units
        ? data.deleted_order_units
        : undefined,
      added_order_units: data.added_order_units
        ? data.added_order_units
        : undefined,
    };

    return this.http
      .put(
        `${environment.apiNewUrl}${this.orderEndpoint}/${data.order_id}`,
        editData
      )
      .pipe(
        tap(() => {
          if (!type) {
            this.updatedOrder$.next('updated-tab');
          }

          if (type && type !== 'edit-row') {
            this.updatedOrder$.next('updated');
          }
        }),
        catchError((err) => {
          this.openSnackBar(err.statusText);
          return throwError(err);
        })
      );
  }

  updateOrderStatus(product: any, status: string) {
    const statusMap = new Map([
      ['new', StatusMap.NEW],
      ['today', StatusMap.TODAY],
      ['keep', StatusMap.KEEP],
      ['incomplete', StatusMap.INCOMPLETE],
      ['processing', StatusMap.PROCESSING],
      ['complete', StatusMap.COMPLETE],
    ]);
    const convertStatus = statusMap.get(status as string);

    const editData: EditOrder = {
      ...product,
      status: convertStatus,
    };

    return this.http
      .put(
        `${environment.apiNewUrl}${this.orderEndpoint}/${editData.order_id}`,
        editData
      )
      .pipe(
        tap(() => this.updatedOrder$.next('updated')),
        catchError((err) => {
          this.openSnackBar(err.statusText);
          return throwError(err);
        })
      );
  }

  getProduct(type: string) {
    let params = new HttpParams();
    params = params.append('order_type', type);

    return this.http
      .get(`${environment.apiNewUrl}${this.orderEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        }),
        catchError(() => {
          return of({
            tableData: [],
            totalResult: 0,
          });
        })
      );
  }

  deleteProduct(order_id: string) {
    return this.http
      .delete(`${environment.apiNewUrl}${this.orderEndpoint}/${order_id}`)
      .pipe(tap(() => this.updatedOrder$.next('updated')));
  }

  private openSnackBar(statusText: string) {
    this.snackBar.open(statusText, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }
}
