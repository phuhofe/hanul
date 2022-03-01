import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css'],
})
export class AccountsPageComponent implements OnInit {
  types = [
    {
      name: 'Tax invoice',
      value: 'tax-invoice',
    },
    {
      name: 'Sales bill',
      value: 'sales bill',
    },
    {
      name: 'Expenditure bill',
      value: 'expenditure-bill',
    },
  ];

  selectedTable: string = this.types[1].value;
  
  constructor() {}

  ngOnInit(): void {}

  onSelectTableType(type: string) {
  }
}
