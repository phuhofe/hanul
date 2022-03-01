import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { preloadTableData } from '@app/services/preload-table-data';
import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { HNTableColumns } from 'src/table-columns-data';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { FinanceService } from '@app/finance/services/finance.service';

@Destroyable()
@Component({
  selector: 'app-finance-table',
  templateUrl: './finance-table.component.html',
  styleUrls: ['./finance-table.component.css'],
})
export class FinanceTableComponent implements OnInit {
  
  totalResult = 0;
  columnsToDisplay = HNTableColumns.JournalEntryTableColumns;
  dataSource!: MatTableDataSource<any>;
  columns = HNTableColumns.JournalEntryTableColumns;
  source: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService
      .getJournalEntryData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.source = data.tableData;
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.source);
      this.totalResult = 123123;
    });  
  }
  
  sortData(event: any) {
    console.log(event);   
  }
}
