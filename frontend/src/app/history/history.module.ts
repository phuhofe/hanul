import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryRoutingModule } from './history-routing.module';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    HistoryPageComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    ComingSoonModule
  ]
})
export class HistoryModule { }
