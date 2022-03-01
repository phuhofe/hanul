import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-manager-search',
  templateUrl: './table-manager-search.component.html',
  styleUrls: ['./table-manager-search.component.css']
})
export class TableManagerSearchComponent implements OnInit {
  @Input() selectedTable!: string;

  @Output() searchParam = new EventEmitter();
  @Output() add = new EventEmitter();

  searchPlaceholder = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.selectedTable) {
      this.setupSearchFieldPlaceholder();
    }
  }

  search(value: string) {
    if (value === '') {
      return this.searchParam.emit('');
    }

    return this.searchParam.emit(value);
  }

  onAddItem() {
    this.add.emit(this.selectedTable);
  }

  setupSearchFieldPlaceholder() {
    if (this.selectedTable === 'product') {
      return (this.searchPlaceholder = 'app_name');
    }

    return (this.searchPlaceholder = 'customerName');
  }
}
