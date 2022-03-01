import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-accounts-search',
  templateUrl: './table-accounts-search.component.html',
  styleUrls: ['./table-accounts-search.component.css']
})
export class TableAccountsSearchComponent implements OnInit {

  @Input() typeName!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
