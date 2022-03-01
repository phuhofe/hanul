import { Component, Input, OnInit } from '@angular/core';

import { ReceivableStatus } from '@app/receivable/models/receivable.model';

@Component({
  selector: 'app-receivable-data',
  templateUrl: './receivable-data.component.html',
  styleUrls: ['./receivable-data.component.css'],
})
export class ReceivableDataComponent implements OnInit {

  @Input() counts: any;

  value = 50000;

  ReceivableStatus = ReceivableStatus;
  isSelectWarned!: boolean;
  isSelectNoOrder!: boolean;
  isSelectSued!: boolean;
  isSelectCaseFinalised!: boolean;

  constructor() {
    this.isSelectWarned = true;
  }

  ngOnInit(): void {}

  onChangeStatus(status: string) {
    if (status === this.ReceivableStatus.WARNED) {
      this.isSelectWarned = true;
      this.isSelectSued = false;
      this.isSelectNoOrder = false;
      this.isSelectCaseFinalised = false;
    }

    if (status === this.ReceivableStatus.SUED) {
      this.isSelectWarned = false;
      this.isSelectSued = true;
      this.isSelectNoOrder = false;
      this.isSelectCaseFinalised = false;
    }

    if (status === this.ReceivableStatus.NO_ORDER) {
      this.isSelectWarned = false;
      this.isSelectSued = false;
      this.isSelectNoOrder = true;
      this.isSelectCaseFinalised = false;
    }

    if (status === this.ReceivableStatus.CASE_FINALISED) {
      this.isSelectWarned = false;
      this.isSelectSued = false;
      this.isSelectNoOrder = false;
      this.isSelectCaseFinalised = true;
    }
  }
}