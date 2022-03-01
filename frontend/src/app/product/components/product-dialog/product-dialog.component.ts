import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from '@app/models';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  localData: any;
  action!: string;
  pageName!: string;
  productForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.localData = { ...this.data }
    this.action = this.localData.action;
    this.initData();
  }

  buildForm() {
    this.productForm = this.fb.group({
      sku: '',
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
      app_name: '',
      image: '',
    });
  }

  initData() {

    this.productForm.patchValue({
      sku: this.localData.sku,
      name: this.localData.name,
      locality: this.localData.locality,
      origin: this.localData.origin,
      meat_category: this.localData.meat_category,
      meat: this.localData.meat,
      part_category: this.localData.part_category,
      part: this.localData.part,
      grade: this.localData.grade,
      cost: this.localData.cost,
      price: this.localData.price,
      app_name: this.localData.app_name,
      image: this.localData.image,
    });
  }

  doAction() {
    this.dialogRef.close({
      event: this.action,
      data: this.productForm.value
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
