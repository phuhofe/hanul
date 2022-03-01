import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LocalStorageService } from '@app/core/services/local-storage.service';
import { FilterCostPriceTable } from '@app/cost-price/models/cost-price-filter-column';
import { TableAction } from '@app/orders/models/table.enum';
import {
  ComparativeColumns,
  FilterPayableReceivableTable,
  PayableColumns,
} from '@app/payable-receivable/models/payable-receivable-filter-column';
import { PayableReceivableType } from '@app/payable-receivable/models/payable-receivable.enum';
import { PayableReceivableService } from '@app/payable-receivable/services/payable-receivable.service';

@Component({
  selector: 'app-payable-receivable-page',
  templateUrl: './payable-receivable-page.component.html',
  styleUrls: ['./payable-receivable-page.component.css'],
})
export class PayableReceivablePageComponent implements OnInit {
  selectedTable!: string;
  payableReceivableType = PayableReceivableType;
  filter: FilterPayableReceivableTable = {};
  totalProduct!: number;

  tabs: Array<any> = [];
  selected = new FormControl(0);
  localPayableReceivableTabString = 'payable-receivable-tabs';

  columnData = PayableColumns;
  tableTypes = [
    {
      name: PayableReceivableType.PAYABLE,
      value: PayableReceivableType.PAYABLE,
    },
    {
      name: PayableReceivableType.RECEIVABLE,
      value: PayableReceivableType.RECEIVABLE,
    },
    {
      name: PayableReceivableType.COMPARATIVE,
      value: PayableReceivableType.COMPARATIVE,
    },
    {
      name: PayableReceivableType.BANK,
      value: PayableReceivableType.BANK,
    },
  ];

  filterArray: Array<string> = [];
  clearAll = false;
  constructor(
    private service: PayableReceivableService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setupTabs();
  }

  onSelectTable(selectedTable: string) {
    this.selectedTable = selectedTable;
    this.onClearAll();
    if (this.selectedTable === PayableReceivableType.PAYABLE) {
      this.columnData = PayableColumns;
    }
    if (this.selectedTable === PayableReceivableType.COMPARATIVE) {
      this.columnData = ComparativeColumns;
    }

    this.service.search(null);
  }

  onFilter(filterKey: string) {
    if (!this.filterArray.includes(filterKey)) {
      return this.filterArray.push(filterKey);
    }
  }

  removeSearchKey(index: number) {
    this.filterArray?.splice(index, 1);
  }

  onClearAll() {
    this.filterArray = [];
    this.clearAll = true;
    setTimeout(() => {
      this.clearAll = false;
    }, 500);
  }

  onUpdateTotal(total: number) {
    setTimeout(() => {
      this.totalProduct = total;
    });
  }

  addPayable() {
    return this.addTab(TableAction.ADD, TableAction.ADD, null, TableAction.ADD);
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  saveToLocalStorage() {
    this.storageService.setItem(
      this.localPayableReceivableTabString,
      this.tabs
    );
  }

  setupTabs() {
    const parseTabs = this.storageService.getItem(
      this.localPayableReceivableTabString
    );
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
}
