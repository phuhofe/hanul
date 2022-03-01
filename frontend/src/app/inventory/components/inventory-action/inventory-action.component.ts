import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { EditInventory } from '@app/inventory/models/inventory.model';
import { allTypesOrder } from '@app/orders/models/mart-product.model';
import { TableAction } from '@app/orders/models/table.enum';

@Component({
  selector: 'app-inventory-action',
  templateUrl: './inventory-action.component.html',
  styleUrls: ['./inventory-action.component.css'],
})
export class InventoryActionComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() action: string = '';

  @Output() close = new EventEmitter();
  @Output() editInventory = new EventEmitter();
  @Output() addInventory = new EventEmitter();
  @Output() updatingForm = new EventEmitter();

  inventoryForm!: FormGroup;
  pageName: string = 'Inventory';
  allTypes = allTypesOrder;

  selectedFiles: any;
  currentFileUpload: any;
  percentage: number = 0;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.inventoryForm.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.updatingForm.emit({
          ...this.data,
          ...this.inventoryForm.value,
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      return this.initData();
    }
    return this.initData();
  }

  buildForm() {
    this.inventoryForm = this.fb.group({
      sku: '',
      supplier: '',
      notes: '',
      date: '',
      date_bought: '',
      stock_boxes: '',
      stock_kg: '',
      serial_no: '',
      stock_id: '',
    });
  }

  initData() {
    this.inventoryForm.patchValue({
      sku: this.data.sku ?? null,
      supplier: this.data.supplier ?? null,
      notes: this.data.notes ?? null,

      date: this.data.date ?? null,
      date_bought: this.data.date_bought ?? null,
      stock_boxes: this.data.stock_boxes ?? null,

      stock_kg: this.data.stock_kg ?? null,
      serial_no: this.data.serial_no ?? null,
      stock_id: this.data.stock_id ?? null,
    });
  }

  closeDialog() {
    this.close.emit(false);
  }

  doAction() {
    const dataEdit: EditInventory = {
      sku: this.data.sku ?? null,
      supplier: this.data.supplier ?? null,
      date: this.data.date ?? null,
      date_bought: this.data.date_bought ?? null,
      stock_boxes: this.data.stock_boxes ?? null,
      stock_kg: this.data.stock_kg ?? null,
      serial_no: this.data.serial_no ?? null,
      notes: this.data.notes ?? null,
      stock_id: this.data.stock_id ?? null,
    };
    const transferData = this.filterNullValue(dataEdit);

    if (this.action === TableAction.EDIT) {
      this.editInventory.emit(transferData);
    }
    if (this.action === TableAction.ADD) {
      this.addInventory.emit(transferData);
    }
   
  }

  onAddProduct() {}

  filterNullValue(obj: any) {
    return Object.entries(obj).reduce(
      (a: any, [k, v]) => (v === null || v === '' ? a : ((a[k] = v), a)),
      {}
    );
  }
}
