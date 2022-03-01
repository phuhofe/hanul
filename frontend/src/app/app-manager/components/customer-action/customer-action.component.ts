import { DatePipe } from '@angular/common';
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

import { EditCustomer } from '@app/app-manager/models/manager.model';
import { allTypesOrder } from '@app/orders/models/mart-product.model';
import { TableAction } from '@app/orders/models/table.enum';
@Component({
  selector: 'app-customer-action',
  templateUrl: './customer-action.component.html',
  styleUrls: ['./customer-action.component.css'],
})
export class CustomerActionComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() action: string = '';

  @Output() close = new EventEmitter();
  @Output() editCustomer = new EventEmitter();

  customerForm!: FormGroup;
  pageName: string = 'Customer';
  allTypes = allTypesOrder;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      return this.initData();
    }
  }

  buildForm() {
    this.customerForm = this.fb.group({
      business_no: '',
      status: '',
      owner_name: ['', Validators.required],
      email: '',
      dob: ['', Validators.required],
      mobile_no: ['', Validators.required],
      phone_no: ['', Validators.required],
      owner_address: ['', Validators.required],
      business_address: '',
      business_category: '',
      buyer_category: '',
      business_certificate: '',
      business_name: '',
      business_type: '',
    });
  }

  initData() {
    this.customerForm.patchValue({
      business_no: this.data.business_no,
      status: this.data.status,
      owner_name: this.data.owner_name,
      email: this.data.email,
      dob: this.data.dob,
      mobile_no: this.data.mobile_no,
      phone_no: this.data.phone_no,
      owner_address: this.data.owner_address,
      business_address: this.data.business_address,
      business_category: this.data.business_category,
      buyer_category: this.data.buyer_category,
      business_certificate: this.data.business_certificate,
      business_name: this.data.business_name,
      business_type: this.data.business_type,
    });
  }

  closeDialog() {
    this.close.emit(false);
  }

  resetAll() {
    // this.productsForm.clear();
    // this.data.rows.forEach((row: any) => {
    //   this.addRow(row);
    // });
    // this.localData = this.data.rows;
  }

  doAction() {
    if (this.action === TableAction.EDIT) {
      const editData: EditCustomer = {};
      const transformValue = this.customerForm.value;
      editData.owner_name = transformValue.owner_name;
      editData.business_name = transformValue.business_name;
      const tempDob = new DatePipe('en-US').transform(
        transformValue.dob,
        'yyyy-MM-dd'
      );
      editData.dob = tempDob?.toString();
      editData.mobile_no = transformValue.mobile_no;
      editData.phone_no = transformValue.phone_no;
      editData.owner_address = transformValue.owner_address;
      editData.business_address = transformValue.business_address;
      editData.buyer_category = transformValue.buyer_category;
      editData.business_type = transformValue.business_type;
      editData.business_category = transformValue.business_category;
      editData.status = transformValue.status;

      this.editCustomer.emit({
        business_no: transformValue.business_no,
        editData,
      });
    }
  }

}
