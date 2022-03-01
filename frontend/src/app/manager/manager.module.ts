import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';
import { ManagerPageComponent } from './manager-page/manager-page.component';


@NgModule({
  declarations: [ManagerPageComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ComingSoonModule
  ]
})
export class ManagerModule { }
