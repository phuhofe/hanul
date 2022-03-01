import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-inventory',
  templateUrl: './confirm-delete-inventory.component.html',
  styleUrls: ['./confirm-delete-inventory.component.css']
})
export class ConfirmDeleteInventoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}