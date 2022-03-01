import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { lossDetailColumns } from '@app/loss/models/loss-filter-column';
import { LossTableType } from '@app/loss/models/loss-table-type.enum';
import { LossService } from '@app/loss/services/loss.service';

@Component({
  selector: 'app-loss-page',
  templateUrl: './loss-page.component.html',
  styleUrls: ['./loss-page.component.css'],
})
export class LossPageComponent implements OnInit {
  totalProduct!: number;
  filterArray: Array<string> = [];
  selectedTable!: LossTableType | null;
  LossTableType = LossTableType;

  tabs: Array<any> = [];
  selected = new FormControl(0);

  lossTabString = 'loss';
  columnData = lossDetailColumns;
  tableTypes = [
    {
      name: LossTableType.DETAIL,
      value: LossTableType.DETAIL,
      
    },
    {
      name: LossTableType.ORIGINAL,
      value: LossTableType.ORIGINAL,
      color: ''
    },
    {
      name: LossTableType.PRODUCT,
      value: LossTableType.PRODUCT,
      color: ''
    },
  ];
  clearAll = false;
  constructor(private lossService: LossService) {}

  ngOnInit(): void {}

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

  onSelectedTable(type: LossTableType) {
    this.selectedTable = type;
    this.onClearAll();
  }

  onUpdateTotal(total: number) {
    this.totalProduct = total;
  }
}
