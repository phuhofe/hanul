import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';

import { pipes } from './pipe';
import { services } from './services';
import { containers } from './containers';
import { components } from './components';
import { OrdersRoutingModule } from './orders-routing.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

const MATERIALMODULE = [
  MatSortModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatBadgeModule,
  MatChipsModule,
  DragDropModule,
  MatDialogModule,
  MatButtonModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    ...containers,
    ...components,
    ...pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    OrdersRoutingModule,
    RowNamePipeModule,
    TranslocoLoaderModule,
    LoadingTableModule,

    ...MATERIALMODULE,
    InterceptorInheritanceModule
  ],
  providers: [
    services,
  ],
})
export class OrdersModule {}
