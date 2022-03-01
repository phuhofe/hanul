import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LossRoutingModule } from './loss-routing.module';
import { COMPONENTS } from './components';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from '@app/shared/models/format-date.model';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { Services } from './services';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsSystemModule } from '@app/shared/tabs-system/tabs-system.module';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';
@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LossRoutingModule,

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
    MatTabsModule,

    LoadingTableModule,
    MenuModule,
    ComingSoonModule,
    TabsSystemModule,
    FilterTableModule,
    InterceptorInheritanceModule
  ],
  providers: [
    ...Services,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
})
export class LossModule {}
