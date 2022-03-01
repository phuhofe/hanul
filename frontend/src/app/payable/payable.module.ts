import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayableRoutingModule } from './payable-routing.module';

import { PayablePageComponent } from './payable-page/payable-page.component';
import { PayableService } from './services/payable.service';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';

@NgModule({
  declarations: [
    PayablePageComponent,
  ],
  imports: [
    CommonModule,
    PayableRoutingModule,
    ComingSoonModule,
  ],
  providers: [
    PayableService
  ]
})
export class PayableModule {}