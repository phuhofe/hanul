import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSystemComponent } from './tab-system/tab-system.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';



@NgModule({
  declarations: [
    TabSystemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    TranslocoLoaderModule
  ],
  exports: [
    TabSystemComponent
  ]
})
export class TabsSystemModule { }
