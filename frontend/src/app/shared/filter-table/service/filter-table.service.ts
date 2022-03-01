import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class FilterTableService {
  constructor(private http: HttpClient) {}

  getLogisticsFilter(module: string): Observable<any> {
    return this.http
      .get(`${environment.apiNewUrl}logistics/${module}/filters`)
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return {
              value: item.filter_name,
              type: item.filter_type,
              triggerFor: [] as string[],
            };
          });
        }),
        map((data: any) => {
          let tasksObservables = data.map((item: any) => {
            return of({
              value: item.value,
              type: item.type,
              triggerFor:
                item.type === 'list_match'
                  ? this.getLogisticsFiltersList(module, item.value)
                  : of({ value: [] }),
            });
          });

          return forkJoin(tasksObservables);
        }),
        tap((data: any) => data.subscribe())
      );
  }

  getLogisticsFiltersList(module: string, field: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('field', field);

    return this.http
      .get(`${environment.apiNewUrl}logistics/${module}/filters/lists`, {
        params,
      })
      .pipe(
        map((data: any) => {
          return data.values;
        })
      );
  }
}
