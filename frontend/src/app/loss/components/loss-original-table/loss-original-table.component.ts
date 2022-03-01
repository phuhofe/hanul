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

import { setupAnimation } from '@app/animation';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { LossDetailService } from '@app/loss/services/loss-detail.service';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-loss-original-table',
  templateUrl: './loss-original-table.component.html',
  styleUrls: ['./loss-original-table.component.css'],
  animations: [setupAnimation()],
})
export class LossOriginalTableComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  isLoaded!: boolean;

  displayedColumns = HNTableColumns.LossOriginalTableColumns;

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
      this.dataSource.paginator = this.paginator;
      // this.applySortingDataAccessor();

      this.dataSource.data = this.source;
      this.isLoaded = true;
      this.totalProduct.emit(this.source.length);
    });
  }

  // applySortingDataAccessor() {
  //   this.dataSource.sortingDataAccessor = (item, property) =>
  //     this.sortFn(item, property);
  // }

  // sortFn(item: any, property: any): string {
  //   switch (property) {
  //     case 'original_code': {
  //       return item.original.code;
  //     }

  //     case 'original_name': {
  //       return item.original.name;
  //     }

  //     case 'original_origin': {
  //       return item.original.origin;
  //     }

  //     case 'product_code': {
  //       return item.product.code;
  //     }

  //     case 'product_name': {
  //       return item.product.name;
  //     }

  //     case 'product_origin': {
  //       return item.product.origin;
  //     }

  //     case 'loss1': {
  //       return item['loss'];
  //     }

  //     case 'branch1': {
  //       return item['branch'];
  //     }

  //     case 'amountLost1': {
  //       return item['amountLost'];
  //     }

  //     case 'implementedDate1': {
  //       return item['implementedDate'];
  //     }

  //     case 'productMade1': {
  //       return item['productMade'];
  //     }

  //     default: {
  //       return item[property];
  //     }
  //   }
  // }

  trackTask(index: number, item: any): string {
    return `${item.id}`;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      loss: this.formBuilder.array([]),
    });

    this.lossForm = this.form.get('loss') as FormArray;
  }

  initData(data: Array<any>) {
    this.lossForm.clear();
    data.forEach((row) => {
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
