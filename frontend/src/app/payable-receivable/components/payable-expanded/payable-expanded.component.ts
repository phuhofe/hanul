import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SortByTypesBought } from '@app/cost-price/models/cost-price-table-type.enum';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

import { PayableReceivableService } from '../../services/payable-receivable.service';

@Component({
  selector: 'app-payable-expanded',
  templateUrl: './payable-expanded.component.html',
  styleUrls: ['./payable-expanded.component.css'],
})
export class PayableExpandedComponent extends TableHelper implements OnInit {
  @Input() type!: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  typeEnum = SortByTypesBought;
  displayedColumns = HNTableColumns.PayableReceivableComparativeExpandedTableColumns;
  form!: FormGroup;
  payableForm: FormArray = new FormArray([]);

  constructor(
    private service: PayableReceivableService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.getPayableExpandedData().subscribe((data: any) => {
      if (data) {
        const source = data.tableData.map((item: any) => {
          return {
            ...item,
            isEdit: false,
          };
        });
        this.dataSource = new MatTableDataSource(source);
        this.initData(source);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      costPrice: this.formBuilder.array([]),
    });

    this.payableForm = this.form.get('costPrice') as FormArray;
  }

  initData(data: Array<any>) {
    this.payableForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushPayable(rowData);
  }
  
  pushPayable(rowData: any) {
    const data = this.formBuilder.group({
      tax: rowData ?? rowData.tax,
      amountBought: rowData ?? rowData.amountBought,
      amountPaid: rowData ?? rowData.amountPaid,
      amountOwe: rowData ?? rowData.amountOwe,
      date: rowData ?? rowData.date,
      method: rowData ?? rowData.method,
    });

    this.payableForm.push(data);
  }
}
