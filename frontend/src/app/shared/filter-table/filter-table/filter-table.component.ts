import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { CostPriceTableType } from '@app/cost-price/models/cost-price-table-type.enum';
import {
  sortByTypesBought,
  sortByTypesSold,
} from '@app/cost-price/models/cost-price-filter-column';

import { FilterTableService } from '../service/filter-table.service';
import { Column } from '../models/column.model';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css'],
})
export class FilterTableComponent implements OnInit {
  @Input() columnData!: Array<Column>;
  @Input() tableTypes!: Array<any>;
  @Input() isFilterCostPrice!: boolean;
  @Input() clearAll!: boolean;
  @Input() module!: string;

  @Output() filter = new EventEmitter();
  @Output() selectTable = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() resetSearch = new EventEmitter();

  selectedTable!: any;
  searchForm = new FormGroup({
    start_date: new FormControl(),
    end_date: new FormControl(),
    searchKey: new FormControl(),
    product_search: new FormArray([]),
    items: new FormArray([]),
    selectedColumn: new FormArray([]),
  });

  isOpen = false;
  isOpenDate = false;
  isOpenLocation = false;
  isItemEdit = false;
  selectedSort!: any | string;
  sortByTypes: any;
  selectedColumn: Array<string> = [];
  selectedFilter!: Column;
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

  filterList = new FormControl();

  listMatchFilterList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterTableService
  ) {}

  ngOnInit(): void {
    this.items.forEach((item: any) => {
      this.addRow(item);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.isFilterCostPrice) {
      this.sortByTypes = sortByTypesBought;
    }

    if (changes && changes.tableTypes && this.tableTypes) {
      this.selectedTable = this.tableTypes[0].value;
    }

    if (changes && this.clearAll) {
      this.selectedFilter = {
        value: '',
        type: '',
        triggerFor: null,
      }
      this.searchForm.reset();
      this.productSearches.clear();
    }

    this.filterService.getLogisticsFilter(this.module).subscribe((data) => {
      data.subscribe((columnData: any) => {
        this.columnData = columnData;
      });
    });
  }

  onSelectTable(type: any) {
    this.selectedTable = type;
    this.selectTable.emit(this.selectedTable);

    if (this.isFilterCostPrice) {
      if (this.selectedTable === CostPriceTableType.BOUGHT) {
        this.sortByTypes = sortByTypesBought;
      }

      if (this.selectedTable === CostPriceTableType.SOLD) {
        this.sortByTypes = sortByTypesSold;
      }
    }
  }

  onSelectedColumn(columnValue: any) {
    this.selectedFilter = this.columnData.find(
      (data) => data.value === columnValue.value
    ) as Column;
  }

  onSelectFilter(event: any) {
    this.filter.emit({
      field: this.selectedFilter.value,
      value: event.value,
    });
  }

  onSelectedSubColumn(columnValue: any) {
    console.log('onSelectedSubColumn', columnValue)
    if (this.selectedColumn.includes(columnValue)) {
      return;
    }

    this.selectedColumn = [...this.selectedColumn, columnValue];
  }

  onSearch() {
    const searchKeyValue = this.searchForm.value.searchKey;
    if (!searchKeyValue || searchKeyValue.trim() === '') {
      return;
    }

    if (this.productSearches.value.includes(searchKeyValue.trim())) {
      return this.searchForm.patchValue({
        searchKey: '',
      });
    }

    return this.addSearchKey();
  }

  addSearchKey() {
    this.filter.emit({
      field: this.selectedFilter.value,
      value: [this.searchForm.value.searchKey],
    });

    this.searchForm.patchValue({
      searchKey: '',
    });
  }

  onSelectedSearchColumn(value: any) {
    console.log('value', value);
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

  onSelectSort(type?: any) {
    if (type) {
      this.selectedSort = type;
      return this.sort.emit(type);
    }

    this.selectedSort = '';
    return this.sort.emit(null);
  }
}
