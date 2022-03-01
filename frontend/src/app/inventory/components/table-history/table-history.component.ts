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

import { setupAnimation } from '@app/animation';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { InventoryPageService } from '@app/inventory/services/inventory-page.service';
import { TableHelper } from '@app/table-helper';

@Destroyable()
@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.css'],
  animations: [setupAnimation()],
})
export class TableHistoryComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();

  columns = [
    {
      columnDef: 'select',
      header: '',
      cell: (_element: any) => ``,
    },
    {
      columnDef: 'code',
      header: 'code',
      cell: (element: any) => `${element.code}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'dom_int',
      header: 'dom/int',
      cell: (element: any) => `${element.dom_int}`,
    },
    {
      columnDef: 'origin',
      header: 'origin',
      cell: (element: any) => `${element.origin}`,
    },
    {
      columnDef: 'grade',
      header: 'grade',
      cell: (element: any) => `${element.grade}`,
    },
    {
      columnDef: 'date',
      header: 'date bought',
      cell: (element: any) => `${element.dateBought}`,
    },
    {
      columnDef: 'box',
      header: 'box',
      cell: (element: any) => `${element.box}`,
    },
    {
      columnDef: 'kg',
      header: 'kg',
      cell: (element: any) => `${element.kg}`,
    },
    {
      columnDef: 'cost',
      header: 'cost',
      cell: (element: any) => `${element.cost}`,
    },
    {
      columnDef: 'totalCost',
      header: 'total cost',
      cell: (element: any) => `${element.totalCost}`,
    },
    {
      columnDef: 'branch',
      header: 'branch',
      cell: (element: any) => `${element.branch}`,
    },
    {
      columnDef: 'serialNo',
      header: 'serial No',
      cell: (element: any) => `${element.serialNo}`,
    },
    {
      columnDef: 'supplierName',
      header: 'supplier name',
      cell: (element: any) => `${element.supplierName}`,
    },
    {
      columnDef: 'action',
      header: 'action',
      cell: (_element: any) => '',
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  inventoryForm: FormArray = new FormArray([]);
  selectedRowIndex!: number;

  isEnableSaveTable = false;

  fetchData: any;
  source: any;
  isLoaded = false;

  constructor(
    private inventoryService: InventoryPageService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.inventoryService
      .getHistoryTableData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: any) => {
        this.source = data.tableData.map((item: any) => {
          return {
            ...item,
            isEdit: false,
          };
        });
        this.fetchData = data.tableData;
        this.initData(this.source);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.source);
      this.dataSource.paginator = this.paginator;
      this.totalProduct.emit(this.source.totalResult);
      this.isLoaded = true;
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
      name: rowData?.name ?? '',
      code: rowData?.code ?? '',
      dom_int: rowData?.dom_int ?? '',
      origin: rowData?.origin ?? '',
      grade: rowData?.grade ?? '',
      date: rowData?.dateBought ?? '',
      box: rowData?.box ?? '',
      kg: rowData?.kg ?? '',
      cost: rowData?.cost ?? '',
      totalCost: rowData?.totalCost ?? '',
      branch: rowData?.branch ?? '',
      serialNo: rowData?.serialNo ?? '',
      supplierName: rowData?.supplierName ?? '',
    });

    this.inventoryForm.push(data);
  }

  onSaveInline(rowIndex: number) {
    const data = this.form.value.inventories[rowIndex];
  }
  
  sortData(sort: any) {
    const sortName = sort.active;
    const sortType = sort.direction;
  }

  pageChange(event: any){
    
  }
}
