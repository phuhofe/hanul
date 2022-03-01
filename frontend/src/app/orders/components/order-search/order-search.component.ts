import {
  ElementRef,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { DATE_FORMATS } from '@app/shared/models/format-date.model';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class OrderSearchComponent implements OnInit {
  @ViewChild('endDate') endDateElement!: ElementRef;

  @Input() productType!: string;

  @Output() add = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() print = new EventEmitter();
  @Output() updateStatus = new EventEmitter();
  @Output() exportCSV = new EventEmitter();

  range = new FormGroup({
    start_date: new FormControl(),
    end_date: new FormControl(),
    customer: new FormControl(),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.range.get('end_date')?.valueChanges.subscribe((date: any) => {
      if (date) {
        setTimeout(() => {
          this.endDateElement.nativeElement.focus();
        }, 0);
      }
    });
  }

  onAddProduct() {
    this.add.emit();
  }

  onSearch() {
    if (this.range.invalid) {
      return;
    }

    const formValue = this.range.value;
    this.search.emit(formValue);
  }

  onPrint() {
    this.print.emit();
  }

  onUpdateStatus() {
    this.updateStatus.emit();
  }

  onExportCSV() {
    this.exportCSV.emit();
  }

}
