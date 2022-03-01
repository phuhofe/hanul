import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxOfficeRoutingModule } from './tax-office-routing.module';
import { TaxOfficeTableComponent } from './tax-office-table/tax-office-table.component';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    TaxOfficeTableComponent
  ],
  imports: [
    CommonModule,
    TaxOfficeRoutingModule,
    ComingSoonModule
  ]
})
export class TaxOfficeModule { }
