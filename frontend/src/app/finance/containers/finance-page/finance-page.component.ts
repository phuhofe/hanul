import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Component({
  selector: 'app-finance-page',
  templateUrl: './finance-page.component.html',
  styleUrls: ['./finance-page.component.css'],
})
export class FinancePageComponent implements OnInit {
  types = [
    {
      name: 'Journal Entry',
      value: 'journal-entry',
    },
    {
      name: 'Asset',
      value: 'asset',
    },
    {
      name: 'Liability',
      value: 'liability',
    },
    {
      name: 'Equity',
      value: 'equity',
    },
  ];

  financeTabsTitle = 'finance';
  tabs: Array<any> = [];
  selected = new FormControl(0);

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {}

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  onAddTab($event: string, tableType: string) {}

  onEditTab($event: string, tableType: string) {}

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
    this.storageService.setItem(this.financeTabsTitle, this.tabs);
  }
}
