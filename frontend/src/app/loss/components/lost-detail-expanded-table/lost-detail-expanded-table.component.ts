import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';

import { LossDetailService } from '@app/loss/services/loss-detail.service';
import { TableHelper } from '@app/table-helper';

@Destroyable()
@Component({
  selector: 'app-lost-detail-expanded-table',
  templateUrl: './lost-detail-expanded-table.component.html',
  styleUrls: ['./lost-detail-expanded-table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LostDetailExpandedTableComponent
  extends TableHelper
  implements OnInit
{
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columns = [
    {
      columnDef: 'select',
      header: '',
      cell: (element: any) => ``,
    },
    {
      columnDef: 'implementedDate',
      header: 'implemented date',
      cell: (element: any) => `${element.implementedDate}`,
    },
    {
      columnDef: 'ceaseDate',
      header: 'cease date',
      cell: (element: any) => `${element.ceaseDate}`,
    },
    {
      columnDef: 'loss',
      header: 'loss',
      cell: (element: any) => `${Math.round(element.loss)} %`,
    },
    {
      columnDef: 'totalAmountLost',
      header: 'total amount lost',
      cell: (element: any) => `${Math.round(element.totalAmountLost)} kg`,
    },
    {
      columnDef: 'totalCost',
      header: 'total cost loss',
      cell: (element: any) => `${element.totalCost}`,
    },
    {
      columnDef: 'totalProductMade',
      header: 'total product made',
      cell: (element: any) => `${element.totalProductMade} kg`,
    },
    {
      columnDef: 'serialNumber',
      header: 'serial number',
      cell: (element: any) => `${element.serialNumber}`,
    },
    {
      columnDef: 'action',
      header: 'action',
      cell: (element: any) => '',
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);

  form!: FormGroup;
  inventoryForm: FormArray = new FormArray([]);
  selectedRowIndex!: number;
  source: any;

  constructor(
    private lostDetailService: LossDetailService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.lostDetailService
      .getLostDetailExpandedData()
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
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      inventories: this.formBuilder.array([]),
    });
    this.inventoryForm = this.form.get('inventories') as FormArray;
  }

  initData(data: Array<any>) {
    this.inventoryForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushData(rowData);
  }

  pushData(rowData: any) {
    const data = this.formBuilder.group({
      implementedDate: '123123',
      ceaseDate: '123123',
      loss: '123123',
      totalAmountLost: '123123',
      totalCost: '123123',
      totalProductMade: '123123',
      serialNumber: '123123',
    });

    this.inventoryForm.push(data);
  }

  onSaveInline(rowIndex: number) {
    const data = this.form.value.inventories[rowIndex];
  }
}
