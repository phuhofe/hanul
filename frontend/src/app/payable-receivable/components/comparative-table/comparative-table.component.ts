import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { setupAnimation } from '@app/animation';
import { SortByTypesBought } from '@app/cost-price/models/cost-price-table-type.enum';
import { PayableReceivableComparativeService } from '@app/payable-receivable/services/payable-receivable-comparative.service';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Component({
  selector: 'app-comparative-table',
  templateUrl: './comparative-table.component.html',
  styleUrls: ['./comparative-table.component.css'],
  animations: [setupAnimation()],
})
export class ComparativeTableComponent extends TableHelper implements OnInit {
  @Input() type!: string;

  @Output() totalProduct = new EventEmitter();
  @Output() loaded = new EventEmitter();
  @Output() loading = new EventEmitter();

  typeEnum = SortByTypesBought;
  displayedColumns = HNTableColumns.PayableReceivableComparativeTableColumns;
  form!: FormGroup;
  payableReceivableForm: FormArray = new FormArray([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: PayableReceivableComparativeService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.loading.emit(true);

    this.service.getComparativeData().subscribe((data: any) => {
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
    this.pushComparative(rowData);
  }

  pushComparative(rowData: any) {
    const data = this.formBuilder.group({
      totalAmountPayable: rowData?.totalAmountPayable ?? '',
      amountPayed: rowData?.amountPayed ?? '',
      amountBought: rowData?.amountBought ?? '',
      date: rowData?.date ?? '',
      amountSold: rowData?.amountSold ?? '',
      amountReceived: rowData?.amountReceived ?? '',
      totalAmountReceivable: rowData?.totalAmountReceivable ?? '',
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