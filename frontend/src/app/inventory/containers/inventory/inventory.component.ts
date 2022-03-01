import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';

import { TableType } from '@app/inventory/models/inventory.enum';
import { InventoryPageService } from '@app/inventory/services/inventory-page.service';

@Destroyable()
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  TableType = TableType;
  selectedTable!: TableType;

  isOpen = false;
  isOpenSub = false;
  totalProduct!: number;
  filterArray: Array<string> = [];
  clearAll = false;
  searchForm = new FormGroup({
    start_date: new FormControl(),
    end_date: new FormControl(),
    searchKey: new FormControl(),
    product_search: new FormArray([]),
  });

  columnData: any;

  tableTypes = [
    {
      name: TableType.TOTAL,
      value: TableType.TOTAL,
    },
    {
      name: TableType.DETAIL,
      value: TableType.DETAIL,
    },
    {
      name: TableType.COMPARATIVE,
      value: TableType.COMPARATIVE,
    },
    {
      name: TableType.HISTORY,
      value: TableType.HISTORY,
    },
  ];

  constructor(private inventoryService: InventoryPageService) {
    this.selectedTable = this.TableType.TOTAL;
  }

  ngOnInit(): void {
    this.inventoryService
      .getTableFilterColumns(TableType.TOTAL)
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        this.columnData = data;
      });
  }

  onSelectTable(type: TableType) {
    this.selectedTable = type;
    this.onClearAll();
    this.searchForm.reset();
    this.inventoryService
      .getTableFilterColumns(this.selectedTable)
      .subscribe((data) => {
        this.columnData = data;
      });
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

  onCloseDateRange(picker: any) {
    picker.restoreFocus = false;
  }

  onTotalProductChange(total: number) {
    setTimeout(() => {
      this.totalProduct = total;
    });
  }
}
