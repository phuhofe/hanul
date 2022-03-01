import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-search',
  templateUrl: './finance-search.component.html',
  styleUrls: ['./finance-search.component.css']
})
export class FinanceSearchComponent implements OnInit {

  @Input() typeName!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
