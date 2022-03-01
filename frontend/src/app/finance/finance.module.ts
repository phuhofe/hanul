import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';

import { components } from './components';
import { containers } from './containers';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceService } from './services/finance.service';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';


const MATERIALMODULE = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatTabsModule,
];

@NgModule({
  declarations: [components, containers],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RowNamePipeModule,
    FinanceRoutingModule,
    TranslocoLoaderModule,

    ...MATERIALMODULE,
    InterceptorInheritanceModule
  ],
  providers: [
    FinanceService    
  ],
})
export class FinanceModule {}
