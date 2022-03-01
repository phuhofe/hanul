import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  selector: 'app-product-manager-table',
  templateUrl: './product-manager-table.component.html',
  styleUrls: ['./product-manager-table.component.css']
})
export class ProductManagerTableComponent implements OnInit {
  @Input() selectedTable!: string;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() add = new EventEmitter();

  searchParam!: string;

  columns = [
    'app_name',
    'description',
    'locality',
    'meat',
    'category',
    'units',
    'created',
    'updated',
  ];
  editable = preloadTableData.managerData.editable;
  columnsToDisplay = this.columns;
  totalResult = 0;
  dataSource = new MatTableDataSource();
  isChangeType = false;
  expandedElement: any;
  TableEnum = TableEnum;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ManagerPageService) {}

  ngOnInit(): void {
    this.service
      .getMobileProductDataTable()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        this.updateDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.columnsToDisplay = this.columns.slice();
    if (this.editable) {
      this.columnsToDisplay.push('action');
    }
  }

  onAddCustomerTab(selectedTable: string) {
    this.add.emit(selectedTable);
  }

  onDelete(app_name: string) {
    this.delete.emit({ index: app_name, type: TableEnum.PRODUCT });
  }

  editCustomer(product: any) {
    this.edit.emit({ selectedTable: this.selectedTable, product });
  }

  onSearch(params: string) {
    this.searchParam = params;
    this.service.searchMobileProduct(params).subscribe((data) => {
      this.updateDataSource(data);
    });
  }

  sortData($event: any) {
    this.service
      .changeProductSort($event, this.searchParam)
      .subscribe((data) => {
        this.updateDataSource(data);
      });
  }

  pageChange($event: any) {
    this.service
      .changeProductPaging($event, this.searchParam)
      .subscribe((data) => {
        this.updateDataSource(data);
      });
  }

  private updateDataSource(data: any) {
    this.dataSource = data.tableData;
    this.totalResult = data.totalResult;
    this.isChangeType = true;

    setTimeout(() => {
      this.isChangeType = false;
    }, 1000);
  }
}
