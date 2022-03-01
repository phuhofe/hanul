import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
  CostPriceBoughtColumns,
  sortByTypesBought,
  sortByTypesSold,
} from '@app/cost-price/models/cost-price-filter-column';
import { CostPriceService } from '@app/cost-price/services/cost-price.service';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { CostPriceTableType } from '@app/cost-price/models/cost-price-table-type.enum';

@Destroyable()
@Component({
  selector: 'app-filter-cost-price',
  templateUrl: './filter-cost-price.component.html',
  styleUrls: ['./filter-cost-price.component.css'],
})
export class FilterCostPriceComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() selectTable = new EventEmitter();
  @Output() sort = new EventEmitter();

  isOpen = false;
  isOpenDate = false;

  columnData = CostPriceBoughtColumns;
  CostPriceTableType = CostPriceTableType;
  selectedTable!: CostPriceTableType;
  selectedSort!: any | string;

  tableTypes = [
    {
      name: CostPriceTableType.BOUGHT,
      value: CostPriceTableType.BOUGHT,
    },
    {
      name: CostPriceTableType.SOLD,
      value: CostPriceTableType.SOLD,
    },
    {
      name: CostPriceTableType.COMPARATIVE,
      value: CostPriceTableType.COMPARATIVE,
    },
  ];
  sortByTypes: any;
  searchForm = new FormGroup({
    start_date: new FormControl(),
    end_date: new FormControl(),
    searchKey: new FormControl(),
    product_search: new FormArray([]),
    items: new FormArray([]),
  });

  items: any = [
    {
      value: 'expense',
      isEdit: false,
    },
    {
      value: 'rent',
      isEdit: false,
    },
    {
      value: 'insurance',
      isEdit: false,
    },
    {
      value: 'debt',
      isEdit: false,
    },
    {
      value: 'appliance',
      isEdit: false,
    },
  ];
  isItemEdit = false;

  dateFilter = [
    { value: 'today' },
    { value: 'weekly' },
    { value: 'monthly' },
    { value: 'yearly' },
    { value: 'total' },
  ];

  get productSearches(): FormArray {
    return this.searchForm.get('product_search') as FormArray;
  }

  get itemsFilter(): FormArray {
    return this.searchForm.get('items') as FormArray;
  }

  constructor(
    private costPriceService: CostPriceService,
    private formBuilder: FormBuilder
  ) {
    this.onSelectTable(CostPriceTableType.BOUGHT);
  }

  ngOnInit(): void {
    this.costPriceService.$searchKey
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: string) => {
        if (data) {
          return this.removeSearchKey(data);
        }
        return this.clearAllSearch();
      });

    this.items.forEach((item: any) => {
      this.addRow(item);
    });
  }

  onSelectTable(type: CostPriceTableType) {
    this.selectedTable = type;
    this.sortByTypes = null;
    this.selectedSort = null;
    if (type === CostPriceTableType.BOUGHT) {
      this.sortByTypes = sortByTypesBought;
    }

    if (type === CostPriceTableType.SOLD) {
      this.sortByTypes = sortByTypesSold;
    }

    this.selectTable.emit(this.selectedTable);
  }

  onSelectSort(type?: any) {
    if (type) {
      this.selectedSort = type;
      return this.sort.emit(type);
    }

    this.selectedSort = '';
    return this.sort.emit(null);
  }

  onSearch() {
    const searchKeyValue = this.searchForm.value.searchKey;

    if (!searchKeyValue || searchKeyValue.trim() === '') {
      return;
    }

    if (this.productSearches.value.includes(searchKeyValue.trim())) {
      this.searchForm.patchValue({
        searchKey: '',
      });
      return;
    }

    this.addSearchKey();
    this.searchForm.patchValue({
      searchKey: '',
    });
  }

  onSelectedColumn(column: string) {
    this.searchForm.patchValue({
      searchKey: column,
    });

    this.onSearch();
  }

  addRow(rowData?: any) {
    this.pushItem(rowData);
  }

  pushItem(data?: any) {
    const orderUnitForm = this.formBuilder.group({
      value: data ? data.value : '',
      isEdit: data ? data.isEdit : false,
    });

    this.itemsFilter.push(orderUnitForm);
  }

  addSearchKey() {
    const newSearchKey = new FormControl(this.searchForm.value.searchKey);
    this.productSearches.push(newSearchKey);
    this.filter.emit(this.searchForm.value);
  }

  removeSearch(value: string) {
    const index = this.productSearches.value.findIndex(
      (item: string) => item === value
    );
    this.productSearches.removeAt(index);
    this.filter.emit(this.searchForm.value);
  }

  clearAllSearch() {
    this.searchForm.reset();
    this.productSearches.clear();
    this.filter.emit(this.searchForm.value);
  }

  saveAllItems() {
    this.items = this.items.map((item: any) => {
      return {
        ...item,
        isEdit: false,
      };
    });
  }

  addItem() {
    this.addRow();
    this.items = this.itemsFilter.value;
  }

  saveItem() {
    this.items = this.itemsFilter.value;
  }

  outsideClick($event: MouseEvent) {
    this.isOpen = false;
  }

  outsideClickDate($event: MouseEvent) {
    this.isOpenDate = false;
  }

  selectedFilterEvent(searchKey: string) {
    this.searchForm.patchValue({
      searchKey,
    });

    this.onSearch();
  }

  removeSearchKey(key: string) {
    const index = this.productSearches.value.findIndex(
      (item: string) => item === key
    );
    if (index !== -1) {
      this.productSearches.removeAt(index);
      this.filter.emit(this.searchForm.value);
    }
  }
}
