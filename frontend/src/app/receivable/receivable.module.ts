import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceivableRoutingModule } from './receivable-routing.module';
import { containers } from './containers';
import { components } from './components';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { ReceivableService } from './services/receivable.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { AddReceivableComponent } from './components/add-receivable/add-receivable.component';
import { ReceivableDataComponent } from './components/receivable-data/receivable-data.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

const MATERIALMODULE = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule,
  MatTooltipModule,
  MatDialogModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
];
@NgModule({
  declarations: [
    components,
    containers,
  ],
  imports: [
    CommonModule,
    ReceivableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RowNamePipeModule,

    TranslocoLoaderModule,

    ...MATERIALMODULE,
    InterceptorInheritanceModule
  ],
  providers: [
    ReceivableService,
  ],
})
export class ReceivableModule {}
