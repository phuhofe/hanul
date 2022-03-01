import {
  Component,
  EventEmitter,
  SimpleChanges,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { allTypesOrder } from '@app/orders/models/mart-product.model';

import {
  ProductStatus,
  ProductType,
  TableAction,
} from '../../models/table.enum';

@Component({
  selector: 'app-mart-product-action',
  templateUrl: './mart-product-action.component.html',
  styleUrls: ['./mart-product-action.component.css'],
})
export class MartProductActionComponent implements OnInit {
  @Input() data: any;
  @Input() action: string = '';

  @Output() close = new EventEmitter();
  @Output() addMartProduct = new EventEmitter();
  @Output() editMartProduct = new EventEmitter();
  @Output() updatingForm = new EventEmitter();
  @Output() deleteRow = new EventEmitter();

  pageName: string = 'product';

  productTypes = [
    ProductType.MART,
    ProductType.BUTCHER,
    ProductType.RESTAURANT,
  ];
  productStatus = [
    ProductStatus.NEW,
    ProductStatus.PROCESSING,
    ProductStatus.COMPLETE,
  ];
  martProductForm!: FormGroup;
  productsForm: FormArray = new FormArray([]);

  addProductForm!: FormGroup;
  localData: any = [];

  isAddingProduct = false;
  expanded = true;

  allTypes = allTypesOrder;
  justAdded = false;

  get rowsArray() {
    return this.martProductForm.controls['order_units'] as FormArray;
  }

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.martProductForm.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.updatingForm.emit({
          ...this.data,
          ...this.martProductForm.value,
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.action?.firstChange && this.data) {
      if (Object.keys(this.data).length !== 0) {
        this.localData = this.data.order_units;
        return this.initData();
      }

      return this.addRow();
    }
  }

  buildForm() {
    this.martProductForm = this.formBuilder.group({
      order_id: '',
      order_no: '',
      business_no: ['', Validators.required],
      status: '',
      order_units: this.formBuilder.array([]),
      deleted_order_units: [[]],
    });
    
    this.productsForm = this.martProductForm.get('order_units') as FormArray;

    this.addProductForm = this.formBuilder.group({
      app_name: '',
      quantity: '',
      type: '',
      sku: '',
      locality: '',
      origin: '',
      unit: '',
      price: '',
      serial_no: '',
      bl_no: '',
      product_notes: '',
      detailed_notes: '',
    });
  }

  initData() {
    this.martProductForm.patchValue({
      order_no: this.data.order_no,
      business_no: this.data.business_no,
      status: this.data.status,
      order_id: this.data.order_id,
    });

    this.data.order_units.forEach((row: any) => {
      this.addRow(row);
    });
  }

  onAddProduct() {
    this.isAddingProduct = true;

    setTimeout(() => {
      window.scrollTo({ top: 200000, behavior: 'smooth' });
    }, 200);

    this.addProductForm.setValue({
      app_name: '',
      quantity: '',
      type: '',
      sku: '',
      locality: '',
      origin: '',
      unit: '',
      price: '',
      serial_no: '',
      bl_no: '',
      product_notes: '',
      detailed_notes: '',
    });
  }

  addRow(rowData?: any) {
    this.isAddingProduct = false;
    this.pushProduct(rowData);

    this.justAdded = true;
    setTimeout(() => {
      this.justAdded = false;
    }, 3000);
  }

  pushProduct(rowData: any) {
    const lessonForm = this.formBuilder.group({
      app_name: rowData ? rowData?.app_name : ['', Validators.required],
      quantity: rowData ? rowData?.quantity : undefined,
      type: rowData ? rowData?.type : ['', Validators.required],
      sku: rowData ? rowData?.sku : '',
      locality: rowData ? rowData?.locality : '',
      origin: rowData ? rowData?.origin : '',
      unit: rowData ? rowData?.unit : '',
      price: rowData ? rowData?.price : undefined,
      serial_no: rowData ? rowData?.serial_no : '',
      bl_no: rowData ? rowData?.bl_no : '',
      product_notes: rowData ? rowData?.product_notes : '',
      detailed_notes: rowData ? rowData?.detailed_notes : '',
      order_id: this.data.order_id,
      order_unit_id: rowData ? rowData?.order_unit_id : null,
    });

    this.productsForm.push(lessonForm);
  }

  resetRow(index: number) {
    const data = this.localData[index];
    this.productsForm.at(index).patchValue(data);
    this.productsForm.at(index).markAsUntouched();
  }

  removeRow(index: number) {
    const formValue = this.martProductForm.value;
    this.productsForm.removeAt(index);
    const deleteRow = formValue.order_units[index];
    formValue.order_units.splice(index, 1);

    this.martProductForm.patchValue({
      deleted_order_units: [
        ...formValue.deleted_order_units,
        deleteRow.order_unit_id,
      ],
    });
  }

  resetAll() {
    this.productsForm.clear();
    this.data.rows.forEach((row: any) => {
      this.addRow(row);
    });
    this.localData = this.data.rows;
  }

  doAction() {
    if (this.productsForm.invalid || this.martProductForm.invalid) {
      return;
    }

    const formValue = this.martProductForm.value;

    const orderUnitValue = formValue.order_units.map((data: any) => {
      return Object.entries(data).reduce(
        (a: any, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );
    });

    const orderUnit = orderUnitValue.filter(
      (orderUnit: any) => orderUnit.order_unit_id
    );

    const addedOrderUnits = orderUnitValue.filter(
      (orderUnit: any) => !orderUnit.order_unit_id
    );

    if (this.action === TableAction.ADD) {
      const addValue = {
        ...formValue,
        order_units: [...addedOrderUnits],
      };
      this.addMartProduct.emit(addValue);
    }

    if (this.action === TableAction.EDIT) {
      const editValue = {
        ...formValue,
        order_units: [...orderUnit],
        added_order_units: [...addedOrderUnits],
      };
      this.editMartProduct.emit(editValue);
    }
  }

  closeDialog() {
    this.close.emit(false);
  }
}
