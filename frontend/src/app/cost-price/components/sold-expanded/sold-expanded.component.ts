import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableHelper } from '@app/table-helper';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { SortByTypesSold } from '@app/cost-price/models/cost-price-table-type.enum';
import { CostPriceSoldService } from '@app/cost-price/services/cost-price-sold.service';

import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-sold-expanded',
  templateUrl: './sold-expanded.component.html',
  styleUrls: ['./sold-expanded.component.css'],
})
export class SoldExpandedComponent extends TableHelper implements OnInit {
  @Input() type!: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  source: any;
  isLoaded = false;
  
  form!: FormGroup;
  costPriceForm: FormArray = new FormArray([]);
  displayedColumns = HNTableColumns.SoldExpandedTableColumns;
  typeEnum = SortByTypesSold;

  constructor(
    private service: CostPriceSoldService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.service
      .getExpandedData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: any) => {
        if (data) {
          this.source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });
          this.initData(this.source);
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.source);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      costPrice: this.formBuilder.array([]),
    });

    this.costPriceForm = this.form.get('costPrice') as FormArray;
  }

  initData(data: Array<any>) {
    this.costPriceForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushData(rowData);
  }

  pushData(rowData: any) {
    const data = this.formBuilder.group({
      serialCode: rowData?.serialCode ?? '',
      code: rowData?.code ?? '',
      name: rowData?.name ?? '',
      origin: rowData?.origin ?? '',
      box: rowData?.box ?? '',
      kg: rowData?.kg ?? '',
      q: rowData?.q ?? '',
      unitPrice: rowData?.unitPrice ?? '',
      totalPrice: rowData?.totalPrice ?? '',
      branch: rowData?.branch ?? '',
      date: rowData?.date ?? '',
      customer: rowData?.customer ?? '',
      receivable: rowData?.receivable ?? '',
      tax: rowData?.tax ?? '',
      category: rowData?.category ?? '',
    });

    this.costPriceForm.push(data);
  }
}
