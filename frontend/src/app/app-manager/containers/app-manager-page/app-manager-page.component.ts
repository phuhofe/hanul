import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableAction } from '@app/orders/models/table.enum';
import { TableEnum } from '@app/app-manager/models/table.enum';
import { tableTypes } from '@app/app-manager/models/table-type';
import { AddProduct, EditProduct } from '@app/app-manager/models/manager.model';

import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { ConfirmDialogComponent } from '@app/orders/confirm-dialog/confirm-dialog.component';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Component({
  selector: 'app-app-manager-page',
  templateUrl: './app-manager-page.component.html',
  styleUrls: ['./app-manager-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppManagerPageComponent implements OnInit {
  types = tableTypes;
  tableEnum = TableEnum;

  selectedTable: string = this.types[0].value;
  searchParam: string = '';

  tabs: Array<any> = [];
  counts = {};
  selected = new FormControl(0);
  selectedProductIndex = 0;

  managerTabsTitle = 'manager-tabs';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private managerPageService: ManagerPageService,
    private storageService: LocalStorageService

  ) {}

  ngOnInit(): void {
    this.setupTabs();
  }

  onUpdatingTab(event: any, index: number) {
    this.tabs[index].data = { ...event };
    this.tabs[index].isUpdating = true;
    this.saveToLocalStorage();
  }

  onSelectTableType(type: string) {
    this.selectedTable = type;
  }

  onSearch(searchParam: string) {
    this.searchParam = searchParam;
  }

  saveToLocalStorage() {
    this.storageService.setItem(this.managerTabsTitle, this.tabs);
  }

  // TABS STUFF
  setupTabs() {
    const parseTabs = this.storageService.getItem(this.managerTabsTitle);
    if (parseTabs) {
      this.tabs = parseTabs;
    }
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

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    this.saveToLocalStorage();
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);

    if (index === 0) {
      this.selectedTable = TableEnum.PRODUCT;
    } else {
      this.selectedTable = '';
    }
  }

  // PRODUCT TAB
  onEditProductTab(event: any) {
    this.addTab(
      TableAction.EDIT,
      this.selectedTable,
      event.product,
      TableAction.EDIT
    );
    this.selectedProductIndex = this.tabs.length;
  }

  editProduct(data: EditProduct) {
    this.managerPageService.editProduct(data).subscribe((result) => {
      if (result) {
        this.openSnackbar(TableAction.EDIT);
        const index = this.tabs.findIndex(
          (item) => item.data.app_name === data.app_name
        );
        if (index !== -1) {
          this.tabs.splice(index, 1);
          this.saveToLocalStorage();
        }
      }
    });
  }

  addProduct(data: AddProduct) {
    this.managerPageService.addProduct(data).subscribe((result) => {
      if (result) {
        this.openSnackbar(TableAction.ADD);
        const index = this.tabs.findIndex(
          (item) => item.data.app_name === data.app_name
        );
        if (index !== -1) {
          this.tabs.splice(index, 1);
          this.saveToLocalStorage();
        }
      }
    });
  }

  deleteProduct(event: any) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '400px',
        data: { type: TableAction.DELETE },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (event.type === TableEnum.CUSTOMER) {
            this.managerPageService
              .deleteCustomer(event.index)
              .subscribe(() => {
                this.openSnackbar(TableAction.DELETE);
              });
          }

          if (event.type === TableEnum.PRODUCT) {
            this.managerPageService.deleteProduct(event.index).subscribe(() => {
              this.openSnackbar(TableAction.DELETE);
            });
          }
        }
      });
  }

  // CUSTOMER TAB
  onAddCustomerTab(selectedTable: string) {
    return this.addTab(TableAction.ADD, selectedTable, null, TableAction.ADD);
  }

  editCustomer(obj: any) {
    this.managerPageService
      .editCustomer(obj.business_no, obj.editData)
      .subscribe((result) => {
        if (result) {
          this.openSnackbar(TableAction.EDIT);
          const index = this.tabs.findIndex(
            (item) => item.data.business_no === obj.business_no
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
            this.saveToLocalStorage();
          }
        }
      });
  }

  // PUSH NOTIFICATION TAB
  onPushNotification(event: any) {
    this.addTab(
      'pushNotification',
      this.selectedTable,
      event,
      TableAction.PUSH
    );
    this.selectedProductIndex = this.tabs.length;
  }

  pushNotification(data: { title: string; body: string; business_no: string }) {
    this.managerPageService.pushNotification(data).subscribe(
      (result) => {
        if (result) {
          this.snackBar.open('Your notification is pushed', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3500,
          });
        }
      },
      () => {
        this.snackBar.open('Something wrong', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3500,
        });
      }
    );
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
