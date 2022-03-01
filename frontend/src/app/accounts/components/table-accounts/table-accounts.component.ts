import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';

import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-table-accounts',
  templateUrl: './table-accounts.component.html',
  styleUrls: ['./table-accounts.component.css'],
})
export class TableAccountsComponent implements OnInit, OnChanges {
  @Input() selectedTable!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalResult = 0;
  columnsToDisplay!: string[];
  dataSource = new MatTableDataSource();
  columns = HNTableColumns.ManagerTableColumns;

  statusMap: any = new Map([
    ['detail', ''],
    ['new', 'new'],
    ['blocked', 'blocked'],
  ]);

  constructor(private managerPageService: ManagerPageService) {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.slice();

    this.managerPageService
      .getMobileCustomerDataTable()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.selectedTable) {
      this.getStatusDataTable(this.selectedTable);
    }
  }

  getStatusDataTable(selectedTable: string) {
    return this.managerPageService
      .getStatusDataTable(this.statusMap.get(selectedTable).toString())
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
        }
      });
  }

  sortData(event: any) {
    const tableStatus = this.statusMap.get(this.selectedTable).toString();

    return this.managerPageService
      .sortMobileCustomerTable(tableStatus, event.active, event.direction)
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
        }
      });
  }
}
