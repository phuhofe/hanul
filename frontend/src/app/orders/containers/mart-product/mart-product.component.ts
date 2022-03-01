import {
  AfterViewInit,
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { preloadTableData } from '@app/services/preload-table-data';
import { OrderPageService } from '@app/orders/services/order-page.service';
import { ConfirmDialogComponent } from '@app/orders/confirm-dialog/confirm-dialog.component';
import { allTypesOrder } from '@app/orders/models/mart-product.model';
import { StatusString, TableAction } from '@app/orders/models/table.enum';
import { setupAnimation } from '@app/animation';
import { TableHelper } from '@app/table-helper';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-mart-product',
  templateUrl: './mart-product.component.html',
  styleUrls: ['./mart-product.component.css'],
  animations: [setupAnimation()],
})
export class MartProductComponent
  extends TableHelper
  implements AfterViewInit, OnInit
{
  @Output() edit = new EventEmitter();
  @Output() print = new EventEmitter();
  @Output() updateStatus = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() checkboxSelection = new EventEmitter();

  @Input() status!: string;
  @Input() productType!: string;
  @Input() searchParam: any;
  @Input() searchCustomerParam: any;

  isChangeType = false;
  pageName!: string;
  totalResult = 0;
  columnsToDisplay = HNTableColumns.OrderTableColumns;

  searchForm = new FormControl();
  isEnableSaveTable = false;
  gettingDataReady = true;
  allTypes = allTypesOrder;

  form!: FormGroup;
  rowDataForm: FormArray = new FormArray([]);
  orderData: Array<any> = [];

  StatusString = StatusString;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private orderPageService: OrderPageService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit() {
    this.setupPageName();
    this.searchForm.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe();

    this.orderPageService
      .getProduct(this.productType)
      .pipe(
        takeUntilDestroyed(this),
        tap((data) => {
          this.dataSource = new MatTableDataSource(data.tableData);
          this.totalResult = data.totalResult;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      )
      .subscribe();

    this.orderPageService.updatedOrder$
      .pipe(takeUntilDestroyed(this))
      .subscribe((isUpdated) => {
        if (isUpdated === 'updated' || isUpdated === 'updated-tab') {
          this.orderPageService
            .filterProductTable(this.productType, this.status)
            .subscribe((data) => {
              if (data) {
                this.updateValue(data);
                this.dataSource = new MatTableDataSource(data.tableData);
                this.totalResult = data.totalResult;
                this.initData(this.orderData);
              }
            });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.status || changes.productType) {
        this.filterProduct();
        this.isChangeType = true;

        setTimeout(() => {
          this.isChangeType = false;
        }, 1000);
      }

      if (this.searchParam) {
        this.searchProduct();
      }

      if (this.searchCustomerParam) {
        this.searchProductCustomer();
      }
    }
  }

  ngAfterViewInit() {}

  updateValue(data: any) {
    this.orderData = data.tableData.map((item: any) => {
      return {
        ...item,
        isEdit: false,
      };
    });

    this.dataSource = new MatTableDataSource<any>(this.orderData);
    this.totalResult = data.totalResult;
    this.dataSource.paginator = this.paginator;
    this.initData(this.orderData);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      rowData: this.formBuilder.array([]),
    });

    this.rowDataForm = this.form.get('rowData') as FormArray;
  }

  initData(data: any) {
    this.rowDataForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  onEnableEditOrderUnits(orderUnits: any) {
    this.isEnableSaveTable = true;
    this.buildForm();

    orderUnits.forEach((row: any) => {
      this.addRow(row);
    });

    this.gettingDataReady = false;
    setTimeout(() => {
      this.gettingDataReady = true;
    }, 1200);
  }

  doAction() {}

  addRow(rowData?: any) {
    this.pushProduct(rowData);
  }

  pushProduct(rowData: any) {
    const lessonForm = this.formBuilder.group({
      businessNo: rowData ? rowData?.business_no : null,
      completed: rowData ? rowData?.completed : null,
      quantity: rowData ? rowData?.quantity : null,
      created: rowData ? rowData?.created : null,
      orderId: rowData ? rowData?.order_id : null,
      orderNo: rowData ? rowData?.order_no : null,
      status: rowData ? rowData?.status : null,
      updated: rowData ? rowData?.updated : null,
      customer: rowData ? rowData?.customer : null,
      name: rowData?.customer ? rowData?.customer.business_name : null,
      address: rowData?.customer ? rowData?.customer.business_address : null,
    });

    this.rowDataForm.push(lessonForm);
  }

  onCancel() {
    this.isEnableSaveTable = false;
  }

  searchProduct() {
    this.orderPageService
      .filterProductByDate(this.productType, this.searchParam)
      .subscribe((data) => {
        if (data) {
          this.updateValue(data);
        }
      });
  }

  searchProductCustomer() {
    this.orderPageService
      .filterProductByCustomName(this.productType, this.searchCustomerParam)
      .subscribe((data) => {
        if (data) {
          this.dataSource.data = data.tableData;
          this.totalResult = data.totalResult;
          this.updateValue(data);
        }
      });
  }
  
  sortData(event: any) {
    this.orderPageService
      .sortProductTable(this.productType, event.active, event.direction)
      .subscribe((data) => {
        if (data) {
          this.dataSource.data = data.tableData;
          this.totalResult = data.totalResult;
          this.updateValue(data);
        }
      });
  }

  filterProduct() {
    this.orderPageService
      .filterProductTable(this.productType, this.status)
      .pipe()
      .subscribe((data) => {
        if (data) {
          this.dataSource.data = data.tableData;
          this.totalResult = data.totalResult;
          this.updateValue(data);
        }
      });
  }

  editProduct(product: any) {
    this.edit.emit(product);
  }

  printProduct(product: any) {
    this.print.emit(product);
  }

  deleteProduct(order_id: string) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          type: 'delete',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.delete.emit(order_id);
          this.orderPageService
            .getProduct(this.productType)
            .subscribe((data) => {
              if (data) {
                this.dataSource = new MatTableDataSource<any>(data.tableData);
                this.totalResult = data.totalResult;
                this.updateValue(data);
              }
            });
        }
      });
  }

  onUpdateStatus(product: any) {
    this.updateStatus.emit(product);
  }

  setupPageName() {
    const path = this.route.snapshot.routeConfig?.path as string;
    this.pageName = path === '' ? 'Product' : path?.toString();
  }

  openErrorSnackBar() {
    this.snackBar.open('Some thing wrong, please check again', '404', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }

  openSuccessSnackBar() {
    this.snackBar.open('Your order is added', '200', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }

  toggleRow(element: any) {
    return (this.expandedElement =
      this.expandedElement === element ? null : element);
  }

  onCheck() {
    this.checkboxSelection.emit(this.selection.selected);
  }

  onEditRow(editRow: any) {
    this.orderPageService
      .editProduct(editRow, 'edit-row')
      .subscribe((result) => {
        if (result) {
          this.openSnackbar(TableAction.EDIT);
          this.orderPageService
            .getProduct(this.productType)
            .subscribe((data) => {
              if (data) {
                this.dataSource = new MatTableDataSource<any>(data.tableData);
                this.totalResult = data.totalResult;
                this.updateValue(data);
              }
            });
        }
      });
  }

  private openSnackbar(type: any) {
    const messageMap = new Map([
      [TableAction.ADD, 'Add product success'],
      [TableAction.EDIT, 'Edit product success'],
      [TableAction.DELETE, 'Delete product success'],
    ]);

    const message = messageMap.get(type) ?? '';

    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }

  editRowProduct(product: any) {}
}
