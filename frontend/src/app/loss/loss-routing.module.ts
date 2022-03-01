import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LossPageComponent } from './components/loss-page/loss-page.component';

const routes: Routes = [
  {
    path: '',
    component: LossPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LossRoutingModule { }
