import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';

import { LossOriginService } from '@app/loss/services/loss-origin.service';
import { TableHelper } from '@app/table-helper';

@Destroyable()
@Component({
  selector: 'app-lost-original-expanded-table',
  templateUrl: './lost-original-expanded-table.component.html',
  styleUrls: ['./lost-original-expanded-table.component.css'],
})
export class LostOriginalExpandedTableComponent
  extends TableHelper
  implements OnInit
{
  totalArray = ['totalAmountLost', 'totalCostLost', 'totalProductMade'];

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
      header: 'loss %',
      cell: (element: any) => `${element.loss} %`,
    },
    {
      columnDef: 'totalAmountLost',
      header: 'total amount lost',
      cell: (element: any) => `${element.totalAmountLost} kg`,
    },
    {
      columnDef: 'totalCostLost',
      header: 'total cost lost',
      cell: (element: any) => `${element.totalCostLost}`,
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

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lostOriginService: LossOriginService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.lostOriginService
      .getLostOriginExpandedData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: any) => {
        if (data) {
          const source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });
          this.dataSource = new MatTableDataSource(source);
          this.initData(source);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.pushInventory(rowData);
  }

  pushInventory(rowData: any) {
    const inventory = this.formBuilder.group({
      productCode: rowData.productCode ?? '',
      implementedDate: rowData.implementedDate ?? '',
      ceaseDate: rowData.ceaseDate ?? '',
      loss: rowData.loss ?? '',
      totalAmountLost: rowData.totalAmountLost ?? '',
      totalCostLost: rowData.totalCostLost ?? '',
      totalProductMade: rowData.totalProductMade ?? '',
      serialNumber: rowData.serialNumber.toString() ?? '',
    });

    this.inventoryForm.push(inventory);
  }

  onSaveInline(rowIndex: number) {
    const data = this.form.value.inventories[rowIndex];
  }
}
