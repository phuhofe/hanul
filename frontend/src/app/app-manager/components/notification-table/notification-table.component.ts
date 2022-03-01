import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { TableEnum } from '@app/app-manager/models/table.enum';

@Destroyable()
@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.css'],
})
export class NotificationTableComponent implements OnInit {
  @Input() selectedTable!: string;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() pushNotification = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalResult = 0;
  columnsToDisplay!: string[];
  dataSource = new MatTableDataSource();
  isChangeType = false;
  columns = ['title', 'business_no', 'created', 'updated'];
  searchParam!: string;
  TableEnum = TableEnum;
  statusMap: any = new Map([
    ['detail', ''],
    ['new', '신규'],
    ['blocked', '블랙리스트'],
  ]);

  constructor(private managerPageService: ManagerPageService) {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.slice();
    this.managerPageService
      .getNotification()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
          setTimeout(() => {
            this.isChangeType = false;
          }, 1000);
        }
      });

  }

  getStatusDataTable(selectedTable: string) {
    return this.managerPageService
      .getStatusDataTable(this.statusMap.get(selectedTable).toString())
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  onSearch(searchParam: string) {
    this.searchParam = searchParam;
    return this.managerPageService
      .searchNotification(searchParam)
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  sortData(sort: Sort) {
    return this.managerPageService
      .sortNotification(sort, this.searchParam)
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
        }
      });
  }

  pageChange(pageParam: any) {
    return this.managerPageService
      .pagingNotification(pageParam, this.searchParam)
      .subscribe((data) => {
        if (data) {
          this.dataSource = data.tableData;
          this.totalResult = data.totalResult;
        }
      });
  }

  onDelete(business_no: string) {
    this.delete.emit({ index: business_no, type: TableEnum.CUSTOMER });
  }

  editCustomer(product: any) {
    this.edit.emit({ selectedTable: this.selectedTable, product });
  }

  onPushNotification(businessNo: any) {
    this.pushNotification.emit(businessNo);
  }
}
