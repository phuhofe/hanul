import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-pay-receipt',
  templateUrl: './add-pay-receipt.component.html',
  styleUrls: ['./add-pay-receipt.component.css'],
})
export class AddPayReceiptComponent implements OnInit {
  
  methodOptions = [
    'card',
    'cash',
    'bankTransfer',
  ];

  taxOptions = [
    'yes',
    'no',
    'later'
  ];

  supplierForm = this.fb.group({
    sku: '123',
    name: '',
    business: '',
    address: '',
    phone: '',
    businessCategory: '',
    businessType: '',
    bankName: '',
    bankDetail: '',
    ownerName: '',
    ownerPhone: '',
    email: '',
  });

  transactionForm = this.fb.group({
    date: '',
    totalAmountPayable: '',
    method: this.methodOptions[0],
    amountPaid: '',
    tax: this.taxOptions[0],
    bankName: '',
    bankNumber: ''
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
