import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() columnData!: Array<{
    value: string,
    triggerFor: Observable<any>
  }>;
  
  @Output() selectedColumn = new EventEmitter();
  @Output() selectedSubColumn = new EventEmitter();

  isOpen = false;

  constructor() { }

  ngOnInit(): void { 
  }

  onChange(column: any) {
    this.selectedColumn.emit(column.value);
    
  }

  onFilerMenuClicked(column: string) {
    this.selectedColumn.emit(column);
  }

  onFilerMenuClickedSub(column: string) {
    this.selectedSubColumn.emit(column);
  }

}
