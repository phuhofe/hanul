import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { containers } from './containers';
import { components } from './components';
import { ProductService } from './services/product.service';
import { ProductRoutingModule } from './product-routing.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';

@NgModule({
  declarations: [
    components,
    containers,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,

    TranslocoLoaderModule,

    RowNamePipeModule,
    InterceptorInheritanceModule,
    FilterTableModule,
    LoadingTableModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
