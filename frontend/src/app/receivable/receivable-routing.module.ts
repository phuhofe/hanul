import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ReceivablePageComponent } from "./containers/receivable-page/receivable-page.component";

const routes: Routes = [
  {
    path: '',
    component: ReceivablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivableRoutingModule { }