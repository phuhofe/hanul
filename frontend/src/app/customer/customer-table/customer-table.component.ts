import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';

import { LocalStorageService } from '@app/core/services/local-storage.service';
import { TableAction } from '@app/orders/models/table.enum';
import { setupAnimation } from '@app/animation';
import { TableHelper } from '@app/table-helper';
import { HNTableColumns } from 'src/table-columns-data';

import { ConfirmDeleteCustomerComponent } from '../confirm-delete-customer/confirm-delete-customer.component';
import { lossDetailColumns } from '../model/customer-columns';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
  animations: [setupAnimation()],
})
export class CustomerTableComponent extends TableHelper implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource = new MatTableDataSource();
  totalResult = 0;
  displayedColumns = HNTableColumns.CustomerTableColumns;
  columnData = lossDetailColumns;
  filterArray: Array<string> = [];
  search!: any;
  nullSymbol = '-';
  isLoading = false;

  pageName!: string;
  isChangeType = false;
  tabs: Array<any> = [];
  form!: FormGroup;
  selected = new FormControl(0);
  customersForm: FormArray = new FormArray([]);
  selectedRowIndex!: number;
  isSearching = false;
  searchKey!: string;
  localCustomerTabString = 'customer-tabs';
  clearAll = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private service: CustomerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private storageService: LocalStorageService
  ) {
    super();
    this.buildForm();
    this.setupTabs();
  }

  ngOnInit() {
    this.setupPageName();
    this.getCustomers();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      customers: this.formBuilder.array([]),
    });

    this.customersForm = this.form.get('customers') as FormArray;
  }

  initData(data: Array<any>) {
    this.form.reset()
    this.customersForm.clear(); 
  
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushCustomer(rowData);
  }

  pushCustomer(rowData: any) {

    const customer = this.formBuilder.group({
      customer_code: rowData.customer_code ?? this.nullSymbol,
      business_no: rowData.business_no ?? this.nullSymbol,
      business_name: rowData.business_name ?? this.nullSymbol,
      // owner_name: rowData.owner_name ?? this.nullSymbol,
      // dob: rowData.dob ?? this.nullSymbol,
      // email: rowData.email ?? this.nullSymbol,
      assignee: rowData.assignee ? rowData.assignee : this.nullSymbol,
      mobile_no: rowData.mobile_no ?? this.nullSymbol,
      // phone_no: rowData.phone_no ?? this.nullSymbol,
      // fax_no: rowData.fax_no ?? this.nullSymbol,
      // owner_address: rowData.owner_address ?? this.nullSymbol,
      business_address: rowData.business_address ?? this.nullSymbol,
      // notes: rowData.notes ?? this.nullSymbol,
      business_type: rowData.business_type ?? this.nullSymbol,
      business_category: rowData.business_category ?? this.nullSymbol,
      // customer_type: rowData.customer_type ?? this.nullSymbol,
      // customer_category: rowData.customer_category ?? this.nullSymbol,
      // customer_status: rowData.customer_status ?? this.nullSymbol,
      created: rowData.created ?? this.nullSymbol,
      updated: rowData.updated ?? this.nullSymbol,
    });
    this.customersForm.push(customer);
  }

  searchCustomer() {
    this.service
      .searchCustomers(this.search.field, this.search.value[0])
      .subscribe((data) => {
        if (data) {
          const source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });

          this.setupData({
            tableData: source,
            totalResult: data.totalResult,
          });
        }
      });
  }

  getCustomers() {
    this.isLoading = true;
    this.service
      .getCustomers()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((data) => {
        console.log('data', data);
        this.isLoading = false;
        this.customersForm.clear();
        if (data) {
          const source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });

          this.setupData({
            tableData: source,
            totalResult: data.totalResult,
          });
          this.isLoading = false;
        }
      });
  }

  setupTabs() {
    const parseTabs = this.storageService.getItem(this.localCustomerTabString);
    if (parseTabs) {
      this.tabs = parseTabs;
    }
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    this.dialog
      .open(ConfirmDeleteCustomerComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.service.deleteCustomers(obj.customer).subscribe(() => {
            this.openSnackbar(TableAction.DELETE);
            this.getCustomers();
          });
        }
      });
  }

  setupPageName() {
    const path = this.route.snapshot.routeConfig?.path as string;
    this.pageName = path === '' ? 'Product' : path?.toString();
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    this.storageService.setItem(this.localCustomerTabString, this.tabs);
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  onAddCustomerTab() {
    return this.addTab(TableAction.ADD, TableAction.ADD, null, TableAction.ADD);
  }

  onAddEditCustomerTab(data: any) {
    return this.addTab(
      TableAction.EDIT,
      TableAction.EDIT,
      data,
      TableAction.EDIT
    );
  }

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

  onPageChange(page: PageEvent) {
    this.service.changePage(page, this.searchKey).subscribe((data: any) => {
      if (data) {
        this.setupData(data);
      }
    });
  }

  sortData(sort: Sort) {
    this.service.sortData(sort, this.searchKey).subscribe((data: any) => {
      if (data) {
        this.setupData(data);
      }
    });
  }

  onSaveInline(rowIndex: number) {
    const data = this.form.value.customers[rowIndex];
    this.onSave({ type: 'edit', data: data });
  }

  onSave(event: { type: string; data: any }) {
    if (event.type === 'edit') {
      return this.service.updateCustomers(event.data).subscribe((data: any) => {
        if (data) {
          const index = this.tabs.findIndex(
            (item) => item.data.customer === event.data.customer
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
            this.saveToLocalStorage();
          }
          this.openSnackbar(TableAction.EDIT);
          this.getCustomers();
        }
      });
    }

    return this.service.addCustomers(event.data).subscribe((data: any) => {
      if (data) {
        const index = this.tabs.findIndex(
          (item) => item.data.customer === event.data.customer
        );
        if (index !== -1) {
          this.tabs.splice(index, 1);
          this.saveToLocalStorage();
        }
        this.openSnackbar(TableAction.ADD);
        this.getCustomers();
      }
    });
  }

  onUpdatingTab(event: any, index: number) {
    this.tabs[index].data = { ...event };
    this.tabs[index].isUpdating = true;
    this.saveToLocalStorage();
  }

  onFilter(filterKey: any) {
    this.search = filterKey;
    if (!this.filterArray.includes(filterKey)) {
      this.filterArray = filterKey.value;
      this.searchCustomer();
    }
  }

  onResetSearch(status: boolean) {
    this.filterArray = [];
  }

  removeSearchKey(index: number) {
    this.filterArray?.splice(index, 1);

    if(this.filterArray.length === 0) {
      this.onClearAll();
    }
  }

  onClearAll() {
    this.clearAll = true;
    this.filterArray = [];
    this.getCustomers();
  }

  private openSnackbar(type: any) {
    const messageMap = new Map([
      [TableAction.ADD, 'Add customer success'],
      [TableAction.EDIT, 'Edit customer success'],
      [TableAction.DELETE, 'Delete customer success'],
    ]);

    const message = messageMap.get(type) ?? '';

    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }

  private setupData(data: { tableData: any; totalResult: number }) {
    this.customersForm.clear();
    this.dataSource = data.tableData;
    this.totalResult = data.totalResult;
    this.initData(data.tableData);
  }
}
