import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import {MatMenuModule} from '@angular/material/menu';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    TranslocoLoaderModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
