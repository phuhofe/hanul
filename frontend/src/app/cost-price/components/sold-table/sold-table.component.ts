import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableHelper } from '@app/table-helper';
import { setupAnimation } from '@app/animation';
import { HNTableColumns } from 'src/table-columns-data';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { SortByTypesSold } from '@app/cost-price/models/cost-price-table-type.enum';
import { CostPriceSoldService } from '@app/cost-price/services/cost-price-sold.service';


@Destroyable()
@Component({
  selector: 'app-sold-table',
  templateUrl: './sold-table.component.html',
  styleUrls: ['./sold-table.component.css'],
  animations: [setupAnimation()],
})
export class SoldTableComponent extends TableHelper implements OnInit {
  @Input() type!: string;
  @Output() totalProduct = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = HNTableColumns.SoldTableColumns;

  form!: FormGroup;
  costPriceForm: FormArray = new FormArray([]);
  typeEnum = SortByTypesSold;
  source: any;
  isLoaded = false;

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
      .getCostPriceSoldData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: any) => {
        if (data) {
          this.source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.source);
      this.totalProduct.emit(this.source.length);
      this.initData(this.source);
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

  sortData(sort: any) {
    const sortName = sort.active;
    const sortType = sort.direction;
  }

  pageChange(event: any){
    console.log(event);
  }
}
