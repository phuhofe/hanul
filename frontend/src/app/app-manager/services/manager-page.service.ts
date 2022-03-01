import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '@environments/environment';
import { AddProduct, EditProduct } from '../models/manager.model';

@Injectable()
export class ManagerPageService {
  customerMobileEndpoint = 'logistics/customers/mobile';
  productMobileEndpoint = 'logistics/products/mobile';
  pushNotificationEndpoint = 'logistics/notification';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  sortMobileCustomerDefaultTable(sortField: string, sortOrder: string) {
    let params = new HttpParams();
    params = params.append('sort_field', sortField);
    params = params.append('sort_order', sortOrder);

    return this.http
      .get(`${environment.apiNewUrl}${this.customerMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortMobileCustomerTable(
    status: string,
    sortField: string,
    sortOrder: string
  ) {
    let params = new HttpParams();
    params = params.append('sort_field', sortField);
    params = params.append('sort_order', sortOrder);

    if (status !== '') {
      params = params.append('status', status);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.customerMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  getMobileCustomerDataTable() {
    return this.http
      .get(`${environment.apiNewUrl}${this.customerMobileEndpoint}`)
      .pipe(
        map((res: any) => { 
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        }),
        catchError((_error: any) => {
          return of({
            tableData: [],
            totalResult: 0,
          });
        })
      );
  }

  getStatusDataTable(status: string) {
    let params = new HttpParams();

    if (status !== '') {
      params = params.append('status', status);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.customerMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  getMobileProductDataTable() {
    return this.http
      .get(`${environment.apiNewUrl}${this.productMobileEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  searchMobileProduct(searchParam: string) {
    let params = new HttpParams();
    params = params.append('product_search', searchParam);

    return this.http
      .get(`${environment.apiNewUrl}${this.productMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  changeProductPaging(pagingParam: any, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('page_size', pagingParam.pageSize);
    params = params.append('page_no', pagingParam.pageIndex);

    if (searchParam) {
      params = params.append('product_search', searchParam);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.productMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  changeProductSort(sortParam: any, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('sort_field', sortParam.active);
    params = params.append('sort_order', sortParam.direction);

    if (searchParam) {
      params = params.append('product_search', searchParam);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.productMobileEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  deleteCustomer(business_no: string) {
    return this.http.delete(
      `${environment.apiNewUrl}${this.customerMobileEndpoint}/${business_no}`
    );
  }

  editCustomer(business_no: string, data: any) {
    return this.http
      .put(
        `${environment.apiNewUrl}${this.customerMobileEndpoint}/${business_no}`,
        data
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  deleteProduct(app_name: string) {
    return this.http.delete(
      `${environment.apiNewUrl}${this.productMobileEndpoint}/${app_name}`
    );
  }

  editProduct(data: EditProduct) {
    return this.http
      .put(
        `${environment.apiNewUrl}${this.productMobileEndpoint}/${data.app_name}`,
        data
      )
      .pipe(
        catchError((err) => {
          this.snackBar.open(err.statusText, '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3500,
          });
          return throwError(err);
        })
      );
  }

  addProduct(data: AddProduct) {
    return this.http
      .post(`${environment.apiNewUrl}${this.productMobileEndpoint}`, data)
      .pipe(
        catchError((err) => {
          this.snackBar.open(err.statusText, '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3500,
          });
          return throwError(err);
        })
      );
  }

  getNotification() {
    return this.http
      .get(`${environment.apiNewUrl}${this.pushNotificationEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortNotification(sortParam: any, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('sort_field', sortParam.active);
    params = params.append('sort_order', sortParam.direction);

    if(searchParam) {
      params = params.append('customer_search', searchParam);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.pushNotificationEndpoint}`, {
        params,
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

  pagingNotification(pagingParam: any, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('page_size', pagingParam.pageSize);
    params = params.append('page_no', pagingParam.pageIndex);

    if(searchParam) {
      params = params.append('customer_search', searchParam);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.pushNotificationEndpoint}`, {
        params,
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

  searchNotification(searchParam: string) {
    let params = new HttpParams();
    params = params.append('customer_search', searchParam);

    return this.http
      .get(`${environment.apiNewUrl}${this.pushNotificationEndpoint}`, {
        params,
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

  pushNotification(data: { title: string; body: string; business_no: string }) {
    const notificationData = {
      ...data,
      business_no: data.business_no,
    };

    return this.http.post(
      `${environment.apiNewUrl}${this.pushNotificationEndpoint}`,
      notificationData
    );
  }
}
