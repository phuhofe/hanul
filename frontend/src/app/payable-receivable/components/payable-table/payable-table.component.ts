import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { setupAnimation } from '@app/animation';
import { SortByTypesBought } from '@app/cost-price/models/cost-price-table-type.enum';
import { FilterPayableReceivableTable } from '@app/payable-receivable/models/payable-receivable-filter-column';
import { PayableReceivableService } from '@app/payable-receivable/services/payable-receivable.service';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Component({
  selector: 'app-payable-table',
  templateUrl: './payable-table.component.html',
  styleUrls: ['./payable-table.component.css'],
  animations: [setupAnimation()],
})
export class PayableTableComponent extends TableHelper implements OnInit, OnChanges {
  @Input() type!: string;
  @Input() filter!: FilterPayableReceivableTable;

  @Output() totalProduct = new EventEmitter();
  @Output() loaded = new EventEmitter();
  @Output() loading = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  typeEnum = SortByTypesBought;
  dataSource!: MatTableDataSource<any>;
  displayedColumns = HNTableColumns.PayableTableColumns;
  form!: FormGroup;
  payableReceivableForm: FormArray = new FormArray([]);
  isDaily = false;
  isWeekly = false;

  constructor(
    private service: PayableReceivableService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.filter && this.filter) {

      const indexDaily = this.filter.product_search?.findIndex(
        (item: string) => item === 'Daily'
      );
      
      const indexWeekly = this.filter.product_search?.findIndex(
        (item: string) => item === 'Weekly'
      );

      if (indexDaily !== -1) {
        this.isDaily = true;
        this.isWeekly = false;
      } else {
        this.isDaily = false;
      }

      if (indexWeekly !== -1) {
        this.isWeekly = true;
        this.isDaily = false;
      } else {
        this.isWeekly = false;
      }
    }
  }

  ngOnInit(): void {
    this.loading.emit(true);

    this.service.getPayableData().subscribe((data: any) => {
      if (data) {
        const source = data.tableData.map((item: any) => {
          return {
            ...item,
            isEdit: false,
          };
        });
        this.dataSource = new MatTableDataSource(source);
        this.totalProduct.emit(data.totalResult);

        this.initData(source);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  buildForm() {
    this.form = this.formBuilder.group({
      payableReceivable: this.formBuilder.array([]),
    });

    this.payableReceivableForm = this.form.get(
      'payableReceivable'
    ) as FormArray;
  }

  initData(data: Array<any>) {
    this.payableReceivableForm.clear();

    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushPayable(rowData);
  }

  pushPayable(rowData: any) {
    const data = this.formBuilder.group({
      supplier: rowData?.supplier ?? '',
      code: rowData?.code ?? '',
      amountBought: rowData?.amountBought ?? '',
      amountPaid: rowData?.amountPaid ?? '',
      amountOwe: rowData?.amountOwe ?? '',
      lastEdited: rowData?.lastEdited ?? '',
      branch: rowData?.branch ?? '',
    });

    this.payableReceivableForm.push(data);
  }

  sortData(sort: any) {
    const sortName = sort.active;
    const sortType = sort.direction;
  }

  pageChange(event: any){

  }
}
