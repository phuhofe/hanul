import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { ReceivableService } from '@app/receivable/services/receivable.service';
import { DATE_FORMATS } from '@app/shared/models/format-date.model';

@Component({
  selector: 'app-receivable-search',
  templateUrl: './receivable-search.component.html',
  styleUrls: ['./receivable-search.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class ReceivableSearchComponent implements OnInit {
  @ViewChild('endDate') endDateElement!: ElementRef;
  @Input() typeName: string = 'Amount Received History';
  @Output() search = new EventEmitter();

  form = new FormGroup({
    start_date: new FormControl(),
    end_date: new FormControl(),
  });

  constructor(private service: ReceivableService) {}

  ngOnInit(): void {
    this.form.get('end_date')?.valueChanges.subscribe((date: any) => {
      if (date) {
        setTimeout(() => {
          this.endDateElement.nativeElement.focus();
        }, 0);
      }
    });
  }

  onSearch() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    this.search.emit(formValue);
    this.service.search(formValue);
  }
}

