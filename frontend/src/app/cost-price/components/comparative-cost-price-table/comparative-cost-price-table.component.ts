import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableHelper } from '@app/table-helper';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { CostPriceComparativeService } from '@app/cost-price/services/cost-price-comparative.service';

import { HNTableColumns } from 'src/table-columns-data';
@Destroyable()
@Component({
  selector: 'app-comparative-cost-price-table',
  templateUrl: './comparative-cost-price-table.component.html',
  styleUrls: ['./comparative-cost-price-table.component.css'],
})
export class ComparativeCostPriceTableComponent
  extends TableHelper
  implements OnInit
{
  @Output() totalProduct = new EventEmitter();
  @Output() loaded = new EventEmitter();
  @Output() loading = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = HNTableColumns.ComparativeTableColumns;
  form!: FormGroup;
  costPriceForm: FormArray = new FormArray([]);
  source: any;
  isLoaded = false;

  constructor(
    private service: CostPriceComparativeService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.source);
      this.dataSource.paginator = this.paginator;

      this.isLoaded = true;
      this.totalProduct.emit(this.source.length);
    });
  }

  getData() {
    this.service
      .getCostPriceComparativeData()
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
      totalCostGoodsBought: rowData?.totalCostGoodsBought ?? '',
      date: rowData?.date ?? '',
      totalCostGoodsSold: rowData?.totalCostGoodsSold ?? '',
    });

    this.costPriceForm.push(data);
  }

  sortData(sort: any) {
    const sortName = sort.active;
    const sortType = sort.direction;
  }

  pageChange(event: any){
    console.log(event);
  }
}
