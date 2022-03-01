import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ProductStatus,
  ProductType,
  TableAction,
} from '@app/orders/models/table.enum';
import { OrderPageService } from '@app/orders/services/order-page.service';
import { ExcelService } from '@app/orders/services/excel.service';

import { PrintTestComponent } from '../print-test/print-test.component';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderPageComponent extends PrintTestComponent implements OnInit {
  tableType: string = '';
  statusType: string = '';
  searchParam: any;
  searchCustomerParam: any;

  selectedProductIndex = 0;
  productEditData: any = {};

  tabs: Array<any> = [];
  counts = {};
  selected = new FormControl(0);

  productType = ProductType;
  tableAction = TableAction;
  productStatus = ProductStatus;

  selectedType = ProductType.MART.toString();
  checkboxSelection: Array<any> = [];
  notAbleToPrint = false;
  isProcessingTeam = false;

  orders: any;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private orderPageService: OrderPageService,
    private router: Router,
    private excelService: ExcelService,
    private storageService: LocalStorageService
  ) {
    super();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/orders/processing-team') {
          this.isProcessingTeam = true;
          this.tableType = 'restaurant';
        } else {
          this.tableType = 'mart';
          this.isProcessingTeam = false;
        }
      });

    this.setupTabs();
    this.getCount();
  }

  ngOnInit(): void {}

  setupTabs() {
    const parseTabs = this.storageService.getItem('tabs');
    if (parseTabs) {
      this.tabs = parseTabs;
    }
  }

  onFilterTable(filter: any) {
    this.tableType = filter.tableType;
    this.statusType = filter.status;
    this.onChangeTableType(this.tableType);
  }

  onChangeTableType(tableType: string) {
    this.tableType = tableType;
    this.onResetSearch();
  }

  // TABS

  addTab(tabName: string, type: string, data: any, action: string) {
    const tabData = {
      action: action,
      type: type,
      label: tabName,
      isUpdating: false,
      index: this.tabs ? this.tabs.length : 0,
      data: data ? data : {},
    };
    this.tabs.push(tabData);
    this.selected.setValue(this.tabs.length);
    this.saveToLocalStorage();
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    this.productEditData = undefined;
    this.saveToLocalStorage();
  }

  onAddProductTab() {
    return this.addTab(
      TableAction.ADD,
      this.selectedType,
      null,
      TableAction.ADD
    );
  }

  onExportCSV() {
    this.downloadFile(this.checkboxSelection);
  }

  onUpdateStatus() {
    this.checkboxSelection.forEach((product) => {
      this.onUpdateOrderStatus(product);
    });
  }

  onPrint() {
    if (this.checkboxSelection.length === 0) {
      return;
    }

    this.printProduct(this.checkboxSelection);

    // const hasAllComplete = this.checkboxSelection.every((order: any) => {
    //   if (order.status === '출고 준비') {
    //     return true;
    //   }

    //   return false;
    // });

    // if (hasAllComplete) {
    //   return this.addTab(
    //     TableAction.PRINT,
    //     this.selectedType,
    //     this.checkboxSelection,
    //     TableAction.PRINT
    //   );
    // }

    this.notAbleToPrint = true;
    setTimeout(() => {
      this.notAbleToPrint = false;
    }, 3000);
  }

  onEditProductTab(product: any) {
    this.addTab(TableAction.EDIT, this.selectedType, product, TableAction.EDIT);
    this.selectedProductIndex = this.tabs.length;
  }

  onUpdatingTab(event: any, index: number) {
    this.tabs[index].data = { ...event };
    this.tabs[index].isUpdating = true;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    this.storageService.setItem('tabs', this.tabs);
  }

  getCount() {
    this.orderPageService.getProductCount().subscribe((data) => {
      if (data) {
        this.counts = data;
      }
    });
  }

  onSearch(param: any) {
    this.searchParam = { ...param };
    this.searchParam.product_type = this.selectedType;
    this.searchCustomerParam = null;
  }

  onSearchCustomer(param: any) {
    this.searchCustomerParam = { ...param };
    this.searchCustomerParam.product_type = this.selectedType;
    this.searchParam = null;
  }

  onResetSearch() {
    this.searchParam = null;
    this.searchCustomerParam = null;
  }

  addProduct(productData: any) {
    const dataTemp = {
      business_no: productData.business_no,
      order_units: [...productData.order_units],
    };

    this.orderPageService.addProduct(dataTemp).subscribe((result) => {
      if (result) {
        this.getCount();
        this.openSnackbar(TableAction.ADD);
        const index = this.tabs.findIndex(
          (item) => item.data.order_id === productData.order_id
        );
        if (index !== -1) {
          this.tabs.splice(index, 1);
          this.productEditData = undefined;
          this.saveToLocalStorage();
        }
      }
    });
  }

  editProduct(productData: any) {
    this.orderPageService.editProduct(productData).subscribe((result) => {
      if (result) {
        this.openSnackbar(TableAction.EDIT);
        const index = this.tabs.findIndex(
          (item) => item.data.order_id === productData.order_id
        );
        if (index !== -1) {
          this.tabs.splice(index, 1);
          this.productEditData = undefined;
          this.saveToLocalStorage();
        }
      }
    });
  }

  onUpdateOrderStatus(product: any) {
    this.orderPageService
      .updateOrderStatus(product, 'complete')
      .subscribe((result) => {
        if (result) {
          this.openSnackbar(TableAction.EDIT);
        }
      });
  }

  deleteProduct(order_id: string) {
    this.orderPageService.deleteProduct(order_id).subscribe(() => {
      this.openSnackbar(TableAction.DELETE);
      this.getCount();
    });
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
    if (index === 0) {
      this.getCount();
    }
  }

  getAllOrder() {
    this.statusType = '';
  }

  onCheckboxSelect(event: Array<any>) {
    this.checkboxSelection = event;
  }

  downloadFile(data: any) {
    this.excelService.generateExcel();
  }

  printProduct(product: any) {
    this.orders = [];
    let data: any;

    if (product.length > 0) {
      this.orders = [...product];
      data = product;
    } else {
      this.orders.push(product);
      data = this.orders;
    }
    setTimeout(() => {
      this.printManyOrderHtml('orders', data);
    }, 120);
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
}
