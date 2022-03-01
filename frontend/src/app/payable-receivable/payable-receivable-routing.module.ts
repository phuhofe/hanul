import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayableReceivablePageComponent } from './components/payable-receivable-page/payable-receivable-page.component';


const routes: Routes = [
  {
    path: '',
    component: PayableReceivablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayableReceivableRoutingModule { }
