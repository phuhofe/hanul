import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { environment } from '@environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ReceivableService {
  receivableEndpoint = 'logistics/receivables';
  countEndpoint = 'logistics/receivables/counts';

  updateTable$ = new BehaviorSubject<string>('');
  $searchKey = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  search(searchKey: string) {
    this.$searchKey.next(searchKey);
  }

  getReceivable() {
    return this.http
      .get(`${environment.apiNewUrl}${this.receivableEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  updateReceivable(data: any) {
    return this.http
      .put(
        `${environment.apiNewUrl}${this.receivableEndpoint}/${data.row_id}`,
        data
      )
      .pipe(
        tap(() => {
          this.updateTable$.next('updated');
        }),
        map((res: any) => {
          return res;
        })
      );
  }

  addReceivable(data: any) {
    return this.http
      .post(`${environment.apiNewUrl}${this.receivableEndpoint}`, data)
      .pipe(
        tap(() => {
          this.updateTable$.next('updated');
        }),
        map((res: any) => {
          return res;
        })
      );
  }

  deleteReceivable(rowId: number) {
    return this.http
      .delete(`${environment.apiNewUrl}${this.receivableEndpoint}/${rowId}`)
      .pipe(
        tap(() => {
          this.updateTable$.next('updated');
        }),
        map((res: any) => {
          return res;
        })
      );
  }

  changePage(page: PageEvent, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('page_size', page.pageSize);
    params = params.append('page_no', page.pageIndex);

    if(searchParam) {
      const startDate: string = new DatePipe('en-US').transform(
        searchParam.start_date,
        'yyyy-MM-dd'
      ) as string;
  
      const endDate: string = new DatePipe('en-US').transform(
        searchParam.end_date,
        'yyyy-MM-dd'
      ) as string;
  
      if (startDate) {
        params = params.append('start_date', startDate);
      }
  
      if (endDate) {
        params = params.append('end_date', endDate);
      }
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.receivableEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortData(sort: Sort, searchParam?: any) {
    let params = new HttpParams();
    params = params.append('sort_field', sort.active);
    params = params.append('sort_order', sort.direction);

    if(searchParam) {
      const startDate: string = new DatePipe('en-US').transform(
        searchParam.start_date,
        'yyyy-MM-dd'
      ) as string;
  
      const endDate: string = new DatePipe('en-US').transform(
        searchParam.end_date,
        'yyyy-MM-dd'
      ) as string;
  
      if (startDate) {
        params = params.append('start_date', startDate);
      }
  
      if (endDate) {
        params = params.append('end_date', endDate);
      }
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.receivableEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  filterReceivableByDate(param: any) {
    let params = new HttpParams();

    const startDate: string = new DatePipe('en-US').transform(
      param.start_date,
      'yyyy-MM-dd'
    ) as string;

    const endDate: string = new DatePipe('en-US').transform(
      param.end_date,
      'yyyy-MM-dd'
    ) as string;

    if (startDate) {
      params = params.append('start_date', startDate);
    }

    if (endDate) {
      params = params.append('end_date', endDate);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.receivableEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  getReceivableCount() {
    const data = {
      warned: 30,
      noOrderUntilPayment: 25,
      sued: 50,
      caseFinalised: 100,
    };
    return of(data);

    return this.http.get(`${environment.apiNewUrl}${this.countEndpoint}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
