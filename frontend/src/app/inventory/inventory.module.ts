import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { ChartsModule } from 'ng2-charts';

import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';
import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { DATE_FORMATS } from '@app/shared/models/format-date.model';

import { containers } from './containers';
import { components } from './components';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryPageService } from './services/inventory-page.service';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

const MATERIALMODULE = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatCheckboxModule,
  MatMenuModule,
  OverlayModule,
  MatProgressSpinnerModule,
  MatExpansionModule
];

@NgModule({
  declarations: [components, containers, ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,

    ChartsModule,
    RowNamePipeModule,
    TranslocoLoaderModule,

    ...MATERIALMODULE,

    LoadingTableModule,
    FilterTableModule,
    InterceptorInheritanceModule
  ],
  providers: [
    InventoryPageService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
})
export class InventoryModule {}
