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

import { allTypesOrder } from '@app/orders/models/mart-product.model';
import { TableAction } from '@app/orders/models/table.enum';
import { EditProduct } from '@app/product/models/product.model';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.css'],
})
export class ProductActionComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() action: string = '';

  @Output() close = new EventEmitter();
  @Output() editProduct = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  @Output() updatingForm = new EventEmitter();
  
  productForm!: FormGroup;
  pageName: string = 'Product';
  allTypes = allTypesOrder;

  selectedFiles: any;
  currentFileUpload: any;
  percentage: number = 0;


  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.productForm.valueChanges
    .pipe(debounceTime(200), distinctUntilChanged())
    .subscribe(() => {
      this.updatingForm.emit({
        ...this.data,
        ...this.productForm.value,
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
    this.productForm = this.fb.group({
      sku: ['', Validators.required],
      app_name: '',
      name: '',
      locality: '',
      origin: '',
      meat_category: '',
      meat: '',
      part_category: '',
      part: '',
      grade: '',
      cost: '',
      price: '',
    });
  }

  initData() {
    this.productForm.patchValue({
      sku: this.data.sku ?? null,
      app_name: this.data.app_name ?? null,
      name:this.data.name ?? null,
      locality: this.data.locality ?? null,

      origin: this.data.origin ?? null,
      meat_category:this.data.meat_category ?? null,
      meat: this.data.meat ?? null,
      part_category:this.data.part_category ?? null,
      
      part:this.data.part ?? null,
      grade: this.data.grade ?? null,
      cost: this.data.cost ?? null,
      price:this.data.price ?? null,
    });
  }

  closeDialog() {
    this.close.emit(false);
  }

  doAction() {
    if (this.action === TableAction.EDIT) {
      const editData: EditProduct = {};
      const transformValue = this.productForm.value;

      editData.sku = transformValue.sku;
      editData.app_name = transformValue.app_name;
      editData.name = transformValue.name;
      editData.locality = transformValue.locality;

      editData.origin = transformValue.origin;
      editData.meat_category = transformValue.meat_category;
      editData.meat = transformValue.meat;
      editData.part_category = transformValue.part_category;

      editData.part = transformValue.part;
      editData.grade = transformValue.grade;
      editData.cost = transformValue.cost;
      editData.price = transformValue.price;
     
      this.editProduct.emit({
        ...editData,
      });
    }

    if (this.action === TableAction.ADD) {
      const editData: EditProduct = {};
      const transformValue = this.productForm.value;

      editData.sku = transformValue.sku;
      editData.app_name = transformValue.app_name;
      editData.name = transformValue.name;
      editData.locality = transformValue.locality;

      editData.origin = transformValue.origin;
      editData.meat_category = transformValue.meat_category;
      editData.meat = transformValue.meat;
      editData.part_category = transformValue.part_category;

      editData.part = transformValue.part;
      editData.grade = transformValue.grade;
      editData.cost = transformValue.cost;
      editData.price = transformValue.price;

      this.addProduct.emit({
        ...editData,
      });
    }
  }

  onAddProduct() {}
}
