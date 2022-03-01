import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LocalStorageService } from '@app/core/services/local-storage.service';
import { ReceivableService } from '@app/receivable/services/receivable.service';

@Component({
  selector: 'app-receivable-page',
  templateUrl: './receivable-page.component.html',
  styleUrls: ['./receivable-page.component.css'],
})
export class ReceivablePageComponent implements OnInit {
  value = 50000;
  types = [
    {
      name: 'Amount R History',
      value: 'amount-r-history',
    },
    {
      name: 'Bank API',
      value: 'bank-api',
    },
  ];
  counts = {};
  selected = new FormControl(0);
  tabs: Array<any> = [];
  storageItem = 'receivableTabs';
  searchKey!: string;
  searchParam: any;
  constructor(
    private service: ReceivableService,
    private localStorageService: LocalStorageService
  ) {
    this.getCount();
  }

  ngOnInit(): void {
    this.setupTabs();
  }

  setupTabs() {
    const parseTabs = this.localStorageService.getItem(this.storageItem);
    if (parseTabs) {
      this.tabs = parseTabs;
    }
  }

  onAddReceivableTab() {
    this.addTab('add', 'add', {}, 'add');
  }

  onEditReceivableTab(data: any) {
    this.addTab('edit', 'edit', data, 'add');
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

  saveToLocalStorage() {
    this.localStorageService.setItem(this.storageItem, this.tabs);
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    this.saveToLocalStorage();
  }

  onSave(event: { type: string; data: any }, index: number) {
    if (event.type === 'edit') {
      return this.service
        .updateReceivable(event.data)
        .subscribe((data: any) => {
          if (data) {
            this.closeTab(index);
            this.saveToLocalStorage();
          }
        });
    }

    return this.service.addReceivable(event.data).subscribe((data: any) => {
      if (data) {
      }
    });
  }

  onSearch(obj: any) {
    this.searchParam = obj;
  }

  getCount() {
    this.service.getReceivableCount().subscribe((data) => {
      if (data) {
        this.counts = data;
      }
    });
  }
}
