import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingTableComponent } from './loading-table.component';



@NgModule({
  declarations: [
    LoadingTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingTableComponent
  ]
})
export class LoadingTableModule { }
