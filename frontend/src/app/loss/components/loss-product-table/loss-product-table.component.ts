import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { setupAnimation } from '@app/animation';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { LossProductService } from '@app/loss/services/loss-product.service';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-loss-product-table',
  templateUrl: './loss-product-table.component.html',
  styleUrls: ['./loss-product-table.component.css'],
  animations: [setupAnimation()],
})
export class LossProductTableComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();
  @Output() loaded = new EventEmitter();
  @Output() loading = new EventEmitter();

  isLoaded!: boolean;

  displayedColumns = HNTableColumns.LossProductTableColumns;
  
  form!: FormGroup;
  lossForm: FormArray = new FormArray([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  source: any;

  constructor(
    private lossProductService: LossProductService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.lossProductService
      .getLostProductData()
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.source;

      this.isLoaded = true;
      this.totalProduct.emit(this.source.length);
    });
  }

  onSort() {
    console.log(this.sort.active);
    console.log(this.sort.direction);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      loss: this.formBuilder.array([]),
    });

    this.lossForm = this.form.get('loss') as FormArray;
  }

  initData(data: Array<any>) {
    this.lossForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushLoss(rowData);
  }

  pushLoss(rowData: any) {
    const loss = this.formBuilder.group({
      originalCode: rowData?.original.code ?? '',
      originalName: rowData?.original.name ?? '',
      originalOrigin: rowData?.original.origin ?? '',
      productCode: rowData?.product.code ?? '',
      productName: rowData?.product.name ?? '',
      productOrigin: rowData?.product.origin ?? '',
      loss: rowData?.loss ?? '',
      branch: rowData?.branch ?? '',
      amountLost: rowData?.amountLost ?? '',
      implementedDate: rowData?.implementedDate ?? '',
      productMade: rowData?.productMade ?? '',
    });

    this.lossForm.push(loss);
  }

  sortData(sort: any) {
    const sortName = this.parseSortFn(sort.active);
    const sortType = sort.direction;
  }
  
  parseSortFn(property: any): string {
    switch (property) {
      case 'loss1': {
        return this.displayedColumns[7];
      }

      case 'branch1': {
        return this.displayedColumns[8];
      }

      case 'amountLost1': {
        return this.displayedColumns[9];
      }

      case 'implementedDate1': {
        return this.displayedColumns[10];
      }

      case 'productMade1': {
        return this.displayedColumns[11];
      }

      default: {
        return property;
      }
    }
  }

  pageChange(event: any){

  }
}
