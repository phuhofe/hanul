import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayablePageComponent } from './payable-page/payable-page.component';


const routes: Routes = [
  {
    path: '',
    component: PayablePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayableRoutingModule { }
