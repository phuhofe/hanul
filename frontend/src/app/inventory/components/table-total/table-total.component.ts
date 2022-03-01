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

import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { InventoryPageService } from '@app/inventory/services/inventory-page.service';
import { TableHelper } from '@app/table-helper';

@Destroyable()
@Component({
  selector: 'app-table-total',
  templateUrl: './table-total.component.html',
  styleUrls: ['./table-total.component.css'],
})
export class TableTotalComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columns = [
    {
      columnDef: 'select',
      header: '',
      cell: (element: any) => ``,
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
      columnDef: 'origin',
      header: 'origin',
      cell: (element: any) => `${element.origin}`,
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
      columnDef: 'total_cost',
      header: 'total cost',
      cell: (element: any) => `${element.total_cost}`,
    },
    {
      columnDef: 'branch',
      header: 'branch',
      cell: (element: any) => `${element.branch}`,
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
  isLoaded: any;

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
      .getTotalTableData()
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
      this.dataSource = new MatTableDataSource(this.source);
      this.dataSource.paginator = this.paginator;
      this.totalProduct.emit(this.source.length);
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
    this.pushInventory(rowData);
  }

  pushInventory(rowData: any) {
    const inventory = this.formBuilder.group({
      name: rowData?.name ?? '',
      code: rowData?.code ?? '',
      origin: rowData?.origin ?? '',
      box: rowData?.box ?? '',
      kg: rowData?.kg ?? '',
      total_cost: rowData?.total_cost ?? '',
      branch: rowData?.branch ?? '',
    });

    this.inventoryForm.push(inventory);
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
