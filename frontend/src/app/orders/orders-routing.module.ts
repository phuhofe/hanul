import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrderPageComponent } from "./containers/order-page/order-page.component";
import { PrintTestComponent } from "./containers/print-test/print-test.component";

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent
  },
  {
    path: 'processing-team',
    component: OrderPageComponent
  },
  {
    path: 'print-test',
    component: PrintTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }