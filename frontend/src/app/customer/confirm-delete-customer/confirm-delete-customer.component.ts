import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-customer',
  templateUrl: './confirm-delete-customer.component.html',
  styleUrls: ['./confirm-delete-customer.component.css']
})
export class ConfirmDeleteCustomerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

