import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { TableAction } from '@app/orders/models/table.enum';

@Component({
  selector: 'app-tab-system',
  templateUrl: './tab-system.component.html',
  styleUrls: ['./tab-system.component.css'],
})
export class TabSystemComponent implements OnInit {
  @Input() tabName!: string;
  tabs: Array<any> = [];
  selected = new FormControl(0);

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  addTableTab() {
    return this.addTab(TableAction.ADD, TableAction.ADD, null, TableAction.ADD);
  }

  onSelectTabIndex(index: number) {
    this.selected.setValue(index);
  }

  saveToLocalStorage() {
    this.localStorageService.setItem(this.tabName, this.tabs);
  }

  setupTabs() {
    const tabsObject = this.localStorageService.getItem(this.tabName);
    const parseTabs = JSON.parse(tabsObject as string);
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
