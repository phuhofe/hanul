import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Component({
  selector: 'app-history-expanded-table',
  templateUrl: './history-expanded-table.component.html',
  styleUrls: ['./history-expanded-table.component.css'],
})
export class HistoryExpandedTableComponent
  extends TableHelper
  implements OnInit, OnChanges
{
  @Input() data: any;

  historyData: Array<any> = [];
  displayedColumns = HNTableColumns.HistoryTableColumns;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  form!: FormGroup;
  historyForm: FormArray = new FormArray([]);

  constructor(private formBuilder: FormBuilder) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      this.historyData = this.data.map((item: any) => {
        return {
          ...item,
          isEdit: false,
        };
      });
      this.dataSource = new MatTableDataSource<any>(this.historyData);
      this.initData();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      histories: this.formBuilder.array([]),
    });

    this.historyForm = this.form.get('histories') as FormArray;
  }

  initData() {
    this.historyForm.clear();
    this.data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushProduct(rowData);
  }

  pushProduct(rowData: any) {
    const dataForm = this.formBuilder.group({
      dateBought: rowData?.dateBought ?? '',
      dateSold: rowData?.dateSold ?? '',
      box: rowData?.box ?? '',
      kg: rowData?.kg ?? '',
      cost: rowData?.cost ?? '',
      branch: rowData?.branch ?? '',
      serialNumber: rowData?.serialNumber ?? '',
      supplierName: rowData?.supplierName ?? '',
    });

    this.historyForm.push(dataForm);
  }

  onSaveRow() {}

  enter() {}
}
