import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxOfficeTableComponent } from './tax-office-table/tax-office-table.component';

const routes: Routes = [
  {
    path: '',
    component: TaxOfficeTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxOfficeRoutingModule {}
