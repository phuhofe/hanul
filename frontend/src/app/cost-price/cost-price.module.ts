import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';

import { Services } from './services';
import { MenuModule } from '@app/shared/menu/menu.module';
import { DATE_FORMATS } from '@app/shared/models/format-date.model';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';
import { TabsSystemModule } from '@app/shared/tabs-system/tabs-system.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';

import { COMPONENTS } from './components';
import { CostPriceRoutingModule } from './cost-price-routing.module';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    CostPriceRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    TranslocoLoaderModule,

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OverlayModule,
    MatTabsModule,

    TabsSystemModule,
    ComingSoonModule,
    MenuModule,
    FilterTableModule,

    LoadingTableModule,
    InterceptorInheritanceModule
  ],
  providers: [
    ...Services,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class CostPriceModule {}
