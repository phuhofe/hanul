import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';

import { CostPriceTableType } from '@app/cost-price/models/cost-price-table-type.enum';
import {
  ComparativeColumns,
  PayableColumns,
} from '@app/payable-receivable/models/payable-receivable-filter-column';
import { PayableReceivableType } from '@app/payable-receivable/models/payable-receivable.enum';
import { PayableReceivableService } from '@app/payable-receivable/services/payable-receivable.service';
import { Column } from '@app/shared/filter-table/models/column.model';

@Destroyable()
@Component({
  selector: 'app-filter-payable-receivable',
  templateUrl: './filter-payable-receivable.component.html',
  styleUrls: ['./filter-payable-receivable.component.css'],
})
export class FilterPayableReceivableComponent implements OnInit {
  @Input() columnData!: Array<Column>;
  @Output() filter = new EventEmitter();
  @Output() selectTable = new EventEmitter();
  @Output() sort = new EventEmitter();

  isOpen = false;
  isOpenDate = false;
  isOpenLocation = false;
  CostPriceTableType = CostPriceTableType;
  selectedTable!: PayableReceivableType;
  PayableReceivableType = PayableReceivableType;
  selectedSort!: any | string;

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
    { value: 'Daily' },
    { value: 'Weekly' },
    { value: 'Monthly' },
    { value: 'Yearly' },
    { value: 'Total' },
  ];

  locationFilter = [
    { value: 'Busan' },
    { value: 'Ulsan' },
    { value: 'Incheon' },
    { value: 'Daejeon' },
    { value: 'All' },
  ];

  get productSearches(): FormArray {
    return this.searchForm.get('product_search') as FormArray;
  }

  get itemsFilter(): FormArray {
    return this.searchForm.get('items') as FormArray;
  }

  constructor(
    private payableReceivableService: PayableReceivableService,
    private formBuilder: FormBuilder
  ) {
    this.onSelectTable(PayableReceivableType.PAYABLE);
  }

  ngOnInit(): void {
    this.payableReceivableService.$searchKey
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

  onSelectTable(type: PayableReceivableType) {
    if (type === PayableReceivableType.PAYABLE) {
      this.columnData = PayableColumns;
    }
    if (type === PayableReceivableType.COMPARATIVE) {
      this.columnData = ComparativeColumns;
    }
    this.selectedTable = type;
    this.sortByTypes = null;
    this.selectedSort = null;

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

    if (!this.productSearches.value.includes(searchKeyValue.trim())) {
      this.addSearchKey();
    }

    this.searchForm.patchValue({
      searchKey: '',
    });
  }

  addRow(rowData?: any) {
    this.pushItem(rowData);
  }

  pushItem(data?: any) {
    const itemForm = this.formBuilder.group({
      value: data ? data.value : '',
      isEdit: data ? data.isEdit : false,
    });

    this.itemsFilter.push(itemForm);
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

  outsideClickLocation($event: MouseEvent) {
    this.isOpenLocation = false;
  }

  selectedFilterEvent(searchKey: string) {
    this.searchForm.patchValue({
      searchKey,
    });

    this.onSearch();
    this.isOpenDate = false;
    this.isOpenLocation = false;
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

  onSelectedColumn(column: string) {
    this.searchForm.patchValue({
      searchKey: column,
    });

    this.onSearch();
  }
}
