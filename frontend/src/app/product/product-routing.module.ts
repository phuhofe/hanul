import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './containers/product-page/product-page.component';

import { ProductTableComponent } from './containers/product-table/product-table.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
