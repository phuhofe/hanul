import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { FilterTableComponent } from './filter-table/filter-table.component';
import { MenuModule } from '../menu/menu.module';
import { FilterTableService } from './service/filter-table.service';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';


@NgModule({
  declarations: [
    FilterTableComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslocoLoaderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    OverlayModule,
    MatSelectModule,

    InterceptorInheritanceModule
  ],
  exports: [
    FilterTableComponent
  ],
  providers: [
    FilterTableService
  ]
})
export class FilterTableModule { }
