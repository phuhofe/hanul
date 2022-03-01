import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableHelper } from '@app/table-helper';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { SortByTypesBought } from '@app/cost-price/models/cost-price-table-type.enum';
import { CostPriceBoughtService } from '@app/cost-price/services/cost-price-bought.service';
import { HNTableColumns } from 'src/table-columns-data';


@Destroyable()
@Component({
  selector: 'app-bought-expanded',
  templateUrl: './bought-expanded.component.html',
  styleUrls: ['./bought-expanded.component.css'],
})
export class BoughtExpandedComponent extends TableHelper implements OnInit {
  @Input() type!: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  source: any;
  form!: FormGroup;
  costPriceForm: FormArray = new FormArray([]);

  typeEnum = SortByTypesBought;
  displayedColumns = HNTableColumns.BoughtExpandedColumns;

  constructor(
    private service: CostPriceBoughtService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.service
      .getCostPriceBoughtExpandedData()
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
      unitCost: rowData?.unitCost ?? '',
      totalCost: rowData?.totalCost ?? '',
      branch: rowData?.branch ?? '',
      date: rowData?.date ?? '',
      supplier: rowData?.supplier ?? '',
      amountOwe: rowData?.amountOwe ?? '',
      tax: rowData?.tax ?? '',
      category: rowData?.category ?? '',
    });

    this.costPriceForm.push(data);
  }
}
