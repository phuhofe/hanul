import { Component, OnInit } from '@angular/core';

import { CostPriceService } from '@app/cost-price/services/cost-price.service';
import { CostPriceBoughtColumns, FilterCostPriceTable } from '@app/cost-price/models/cost-price-filter-column';
import { CostPriceTableType } from '@app/cost-price/models/cost-price-table-type.enum';

@Component({
  selector: 'app-cost-price-page',
  templateUrl: './cost-price-page.component.html',
  styleUrls: ['./cost-price-page.component.css'],
})
export class CostPricePageComponent implements OnInit {
  selectedTable!: CostPriceTableType;
  totalProduct!: number;
  filter: FilterCostPriceTable = {};

  CostPriceTableType = CostPriceTableType;
  isLoading = true;

  type!: any;
  costPriceTabString = 'cost-price';

  columnData = CostPriceBoughtColumns;
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
  filterArray: Array<string> = [];
  clearAll = false;

  constructor(private service: CostPriceService) {}

  ngOnInit(): void {}

  onSelectedTable(type: CostPriceTableType) {
    this.selectedTable = type;
    this.isLoading = true;
    this.onClearAll();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onHandleTotalProduct(event: any) {
    setTimeout(() => {
      this.totalProduct = event;
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
    setTimeout(()=> {
      this.clearAll = false ;
    }, 500);
  }

  onSelectType(type: any) {
    this.type = type;
  }
}
