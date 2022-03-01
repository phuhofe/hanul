import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import { LossDetailService } from '@app/loss/services/loss-detail.service';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { TableHelper } from '@app/table-helper';
import { setupAnimation } from '@app/animation';

import { HNTableColumns } from 'src/table-columns-data';
import { tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Destroyable()
@Component({
  selector: 'app-loss-detail-table',
  templateUrl: './loss-detail-table.component.html',
  styleUrls: ['./loss-detail-table.component.css'],
  animations: [setupAnimation()],
})
export class LossDetailTableComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  isLoaded = false;
  displayedColumns = HNTableColumns.LossDetailTableColumns;
  form!: FormGroup;
  lossForm: FormArray = new FormArray([]);
  source: any;

  constructor(
    private lossDetailService: LossDetailService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.lossDetailService
      .getLostDetailData()
      .pipe(
        tap((data) => {
          if (data) {
            this.source = data.tableData.map((item: any) => {
              return {
                ...item,
                isEdit: false,
              };
            });

            this.initData(this.source);
          }
        }),
        takeUntilDestroyed(this)
      )
      .subscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.source;

      this.totalProduct.emit(this.source.length);
      this.isLoaded = true;
    });
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

  // applySortingDataAccessor() {
  //   this.dataSource.sortingDataAccessor = (item, property) =>
  //     this.sortFn(item, property);
  // }

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
