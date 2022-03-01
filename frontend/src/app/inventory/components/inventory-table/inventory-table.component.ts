import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { TableAction } from '@app/orders/models/table.enum';
import { preloadTableData } from '@app/services/preload-table-data';
import { EditInventory } from '@app/inventory/models/inventory.model';
import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { InventoryPageService } from '@app/inventory/services/inventory-page.service';

import { ConfirmDeleteInventoryComponent } from '../confirm-delete-inventory/confirm-delete-inventory.component';

@Destroyable()
@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css'],
})
export class InventoryTableComponent implements OnInit {
  @Input() selectedTable!: string;
  @Input() type!: string;
  @Input() searchKey!: string;
  @Input() searchParam: any;

  @Output() editTab = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() deleteInventory = new EventEmitter();
  @Output() addInventory = new EventEmitter();

  totalResult = 0;
  columnsToDisplay!: string[];
  dataSource: any;
  columns = preloadTableData.inventoryData.columns;
  editable = preloadTableData.inventoryData.editable;

  selectedStockId!: number;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  form!: FormGroup;
  inventoryForm: FormArray = new FormArray([]);

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private inventoryPageService: InventoryPageService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.slice();
    this.inventoryPageService
      .getInventoryTable()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.setupData(data);
        }
      });

    if (this.editable) {
      this.columnsToDisplay.push('action');
    }

    this.inventoryPageService.$searchKey.subscribe((value) => {
      this.searchParam = value;

      this.inventoryPageService.filterInventory(value).subscribe((data) => {
        if (data) {
          this.setupData(data);
        }
      });
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      inventory: this.formBuilder.array([]),
    });

    this.inventoryForm = this.form.get('inventory') as FormArray;
  }

  initData(data: any) {
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
      sku: rowData.sku ?? '',
      supplier: rowData.supplier ?? '',
      date: rowData.date ?? '',
      date_bought: rowData.date_bought ?? '',
      stock_boxes: rowData.stock_boxes ?? '',
      stock_kg: rowData.stock_kg ?? '',
      serial_no: rowData.serial_no ?? '',
      notes: rowData.notes ?? '',
      stock_id: rowData.stock_id ?? '',
      created: rowData.created ?? '',
      updated: rowData.updated ?? '',
      isEdit: false,
    });

    this.inventoryForm.push(inventory);
  }

  searchData(event: any) {
    return this.inventoryPageService
      .sortInventoryTable(event)
      .subscribe((data) => {
        if (data) {
          this.setupData(data);
        }
      });
  }

  sortData(event: any) {
    return this.inventoryPageService
      .sortInventoryTable(event, this.searchParam)
      .subscribe((data) => {
        if (data) {
          this.setupData(data);
        }
      });
  }

  pageChange(event: any) {
    return this.inventoryPageService
      .changePageInventoryTable(event, this.searchParam)
      .subscribe((data) => {
        if (data) {
          this.setupData(data);
        }
      });
  }

  updateRowData(rowObj: any) {
    const dataSelected = this.form.value.inventory.find(
      (item: any) => item.stock_id === rowObj
    );
    const dataEdit: EditInventory = {
      sku: dataSelected.sku ?? null,
      supplier: dataSelected.supplier ?? null,
      date: dataSelected.date ?? null,
      date_bought: dataSelected.date_bought ?? null,
      stock_boxes: dataSelected.stock_boxes ?? null,
      stock_kg: dataSelected.stock_kg ?? null,
      serial_no: dataSelected.serial_no ?? null,
      notes: dataSelected.notes ?? null,
      stock_id: dataSelected.stock_id ?? null,
    };
    const transferData = this.filterNullValue(dataEdit);
    this.editRow.emit(transferData);
  }

  onDelete(stockId: number) {
    this.dialog
      .open(ConfirmDeleteInventoryComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteInventory.emit(stockId);
        }
      });
  }

  onEditInventoryTab(data: any) {
    return this.editTab.emit({
      action: TableAction.EDIT,
      data,
    });
  }

  onAddInventory() {
    this.addInventory.emit();
  }

  filterNullValue(obj: any) {
    return Object.entries(obj).reduce(
      (a: any, [k, v]) => (v === null || v === '' ? a : ((a[k] = v), a)),
      {}
    );
  }

  private setupData(data: { tableData: any; totalResult: number }) {
    this.dataSource = data.tableData;
    this.totalResult = data.totalResult;
    this.initData(data.tableData);
  }
}
