import { EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

import { ProductStatus, ProductType } from '@app/orders/models/table.enum';
@Component({
  selector: 'app-order-filer-table',
  templateUrl: './order-filer-table.component.html',
  styleUrls: ['./order-filer-table.component.css'],
})
export class OrderFilerTableComponent implements OnInit, OnChanges {
  @Input() counts: any;
  @Input() isProcessingTeam!: boolean;

  @Output() tableType = new EventEmitter();
  @Output() filter = new EventEmitter();

  isSelectButcher!: boolean;
  isSelectRestaurant!: boolean;
  isSelectMart!: boolean;
  selectedStatus = '';
  productType = ProductType;
  productStatus = ProductStatus;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isProcessingTeam) {
      if (this.isProcessingTeam) {
        this.isSelectRestaurant = true;
      } else {
        this.isSelectMart = true;
      }
    }
  }

  ngOnInit(): void {}

  onChangeTable(type: string) {
    this.tableType.emit(type);
    this.setCurrentSelectedTable(type);
  }

  setCurrentSelectedTable(type: string) {
    if (type === this.productType.MART) {
      this.isSelectMart = true;
      this.isSelectRestaurant = false;
      this.isSelectButcher = false;
    }

    if (type === this.productType.RESTAURANT) {
      this.isSelectMart = false;
      this.isSelectRestaurant = true;
      this.isSelectButcher = false;
    }

    if (type === this.productType.BUTCHER) {
      this.isSelectMart = false;
      this.isSelectRestaurant = false;
      this.isSelectButcher = true;
    }
  }

  filterTable(tableType: string, status: string) {
    this.setCurrentSelectedTable(tableType);
    this.selectedStatus = status;

    this.filter.emit({ tableType, status });
  }
}
