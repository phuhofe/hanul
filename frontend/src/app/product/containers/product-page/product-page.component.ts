import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableAction } from '@app/orders/models/table.enum';

import { LocalStorageService } from '@app/core/services/local-storage.service';
import { ProductTableType } from '@app/product/models/product-table-type.enum';
import { productColumns } from '@app/product/models/product-filter-column';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  endpoint!: string;
  defaultSort!: string;
  defaultSortOrder!: string;
  pageName!: string;
  totalResult: number = 0;

  tabs: Array<any> = [];
  counts = {};
  selected = new FormControl(0);
  productTabsTitle = 'product-tabs';
  selectedProductIndex = 0;

  ProductTableType = ProductTableType;
  tableTypes = [
    {
      name: ProductTableType.PRODUCT,
      value: ProductTableType.PRODUCT,
      color: '',
    },

    {
      name: ProductTableType.DETAIL,
      value: ProductTableType.DETAIL,
    },

    {
      name: ProductTableType.ORIGINAL,
      value: ProductTableType.ORIGINAL,
      color: '',
    },
  ];
  columnData = productColumns;
  clearAll = false;
  totalProduct!: number;
  filterArray: Array<string> = [];
  selectedTable!: ProductTableType | null;
  search!: any;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private storageService: LocalStorageService
  ) {
    this.selectedTable = ProductTableType.PRODUCT;
  }

  ngOnInit() {
    this.setupPageName();
    this.setupTabs();
  }

  ngAfterViewInit() {}

  onUpdatingTab(event: any, index: number) {
    this.tabs[index].data = { ...event };
    this.tabs[index].isUpdating = true;
    this.saveToLocalStorage();
  }

  setupTabs() {
    const parseTabs = this.storageService.getItem(this.productTabsTitle);
    if (parseTabs) {
      this.tabs = parseTabs;
    }
  }

  onEditProductTab(event: any) {
    this.addTab(TableAction.EDIT, event, TableAction.EDIT);
    this.selectedProductIndex = this.tabs.length;
  }

  addTab(tabName: string, data: any, action: string) {
    const tabData = {
      action: action,
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
    this.saveToLocalStorage();
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  saveToLocalStorage() {
    this.storageService.setItem(this.productTabsTitle, this.tabs);
  }

  editProductTab(data: any) {
    this.productService
      .updateProduct(data)
      .pipe()
      .subscribe((data: any) => {
        if (data) {
          this.productService.getProduct(true);
          this.openSnackbar(TableAction.EDIT);
          const index = this.tabs.findIndex(
            (item) => item.data.sku === data.sku
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
            this.saveToLocalStorage();
          }
        }
      });
  }

  addProductTab(data: any) {
    this.productService
      .addProduct(data)
      .pipe()
      .subscribe((data: any) => {
        if (data) {
          this.productService.getProduct(true);
          this.openSnackbar(TableAction.ADD);
          const index = this.tabs.findIndex(
            (item) => item.data.sku === data.sku
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
            this.saveToLocalStorage();
          }
        }
      });
  }

  onAddProductTab() {
    this.addTab(TableAction.ADD, {}, TableAction.ADD);
    this.selectedProductIndex = this.tabs.length;
  }

  setupPageName() {
    const path = this.route.snapshot.routeConfig?.path as string;
    this.pageName = path === '' ? 'Product' : path?.toString();
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

  onFilter(filterKey: any) {
    this.search = filterKey;
    console.log("this.search", this.search)
    if (!this.filterArray.includes(filterKey)) {
      this.filterArray = filterKey.value;
    }
  }

  onResetSearch(status: boolean){
    this.filterArray = [];
  }
  
  removeSearchKey(index: number) {
    this.filterArray?.splice(index, 1);
  }

  onClearAll() {
    this.filterArray = [];
    this.clearAll = true;
    this.search = null;
    setTimeout(() => {
      this.clearAll = false;
    }, 500);
  }

  onSelectedTable(type: ProductTableType) {
    this.selectedTable = type;
    this.onClearAll();
  }

  onUpdateTotal(total: number) {
    this.totalProduct = total;
  }
}
