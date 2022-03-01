import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { preloadTableData } from '@app/services/preload-table-data';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { TableEnum } from '@app/app-manager/models/table.enum';

@Destroyable()
@Component({
  selector: 'app-customer-manager-table',
  templateUrl: './customer-manager-table.component.html',
  styleUrls: ['./customer-manager-table.component.css']
})
export class CustomerManagerTableComponent implements OnInit {
  @Input() selectedTable!: string;
  @Input() searchParam!: string;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalResult = 0;
  columnsToDisplay!: string[];
  dataSource = new MatTableDataSource();
  isChangeType = false;
  columns = [
    'email',
    'status',
    'buyer_category',
    'mobile_no',
    'phone_no',
    'dob',
    'created',
    'updated',
  ];

  editable = preloadTableData.managerData.editable;
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
      .getMobileCustomerDataTable()
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

    if (this.editable) {
      this.columnsToDisplay.push('action');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.selectedTable) {
      this.isChangeType = true;
      this.getStatusDataTable(this.selectedTable);

      setTimeout(() => {
        this.isChangeType = false;
      }, 1000);
    }
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

  onDelete(business_no: string) {
    this.delete.emit({ index: business_no, type: TableEnum.CUSTOMER });
  }

  editCustomer(product: any) {
    this.edit.emit({ selectedTable: this.selectedTable, product });
  }
}
