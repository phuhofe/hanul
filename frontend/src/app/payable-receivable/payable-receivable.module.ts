import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { DATE_FORMATS } from '@app/shared/models/format-date.model';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';
import { TabsSystemModule } from '@app/shared/tabs-system/tabs-system.module';
import { MenuModule } from '@app/shared/menu/menu.module';

import { PayableReceivableRoutingModule } from './payable-receivable-routing.module';
import { COMPONENTS } from './components';
import { Services } from './services';
import { FilterTableModule } from '@app/shared/filter-table/filter-table.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';


@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    PayableReceivableRoutingModule,
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
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    ComingSoonModule,
    TabsSystemModule,
    MenuModule,
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
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class PayableReceivableModule {}
