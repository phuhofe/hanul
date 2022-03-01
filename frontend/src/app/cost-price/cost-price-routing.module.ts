import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CostPricePageComponent } from './components/cost-price-page/cost-price-page.component';

const routes: Routes = [
  {
    path: '',
    component: CostPricePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostPriceRoutingModule { }
