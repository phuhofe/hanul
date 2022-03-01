import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashflowPageComponent } from './cashflow-page/cashflow-page.component';
import { CashflowRoutingModule } from './cashflow-routing.module';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    CashflowPageComponent
  ],
  imports: [
    CommonModule,
    CashflowRoutingModule,

    ComingSoonModule
  ]
})
export class CashflowModule { }
