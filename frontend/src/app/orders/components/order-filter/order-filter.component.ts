import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent implements OnInit {

  selected: Date | null = new Date();

  selectedSortBy = '';

  sortByOptions = [
    {
      viewValue: 'Customer (Alphabetical)',
      value: 1
    },
    {
      viewValue: 'Time of order placement',
      value: 2
    },
    {
      viewValue: 'Time of complete by processing team',
      value: 3
    },
    {
      viewValue: 'Time of completed',
      value: 4
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
