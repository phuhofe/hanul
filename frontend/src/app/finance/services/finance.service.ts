import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class FinanceService {
  constructor(private http: HttpClient) {}

  getJournalEntryData() {
    return of({
      tableData: [],
      totalResult: 0,
    });
  }

  getAssetsData() {
    return of({
      tableData: [],
      totalResult: 0,
    });
  }

  getLiabilityData() {
    return of({
      tableData: [],
      totalResult: 0,
    });
  }

  getEquityData() {
    return of({
      tableData: [],
      totalResult: 0,
    });
  }
}
