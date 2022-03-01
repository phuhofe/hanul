import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';

import { TabsSystemModule } from '@app/shared/tabs-system/tabs-system.module';
import { CustomerService } from './services/customer.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ConfirmDeleteCustomerComponent } from './confirm-delete-customer/confirm-delete-customer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';
import { CustomerExpandedTableComponent } from './customer-expanded-table/customer-expanded-table.component';


@NgModule({
  declarations: [
    CustomerTableComponent,
    CustomerDialogComponent,
    EditCustomerComponent,
    ConfirmDeleteCustomerComponent,
    CustomerExpandedTableComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,

    TranslocoLoaderModule,
    TabsSystemModule,

    RowNamePipeModule,
    InterceptorInheritanceModule,
    FilterTableModule,
    LoadingTableModule
  ],
  providers:[
    CustomerService,
  ]
})
export class CustomerModule { }
