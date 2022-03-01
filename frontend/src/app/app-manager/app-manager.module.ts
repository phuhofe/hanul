import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { LoadingTableModule } from '@app/shared/loading-table/loading-table.module';

import { Components } from './components';
import { Containers } from './containers';
import { ManagerPageService } from './services/manager-page.service';
import { AppManagerRoutingModule } from './app-manager-routing.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

const MATERIALMODULE = [
  MatIconModule,
  MatIconModule,
  MatCardModule,
  MatSortModule,
  MatTabsModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatChipsModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [...Components, ...Containers,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RowNamePipeModule,
    LoadingTableModule,
    AppManagerRoutingModule,
    TranslocoLoaderModule,
    
    MatFileUploadModule,

    ...MATERIALMODULE,
    InterceptorInheritanceModule
  ],
  providers: [
    ManagerPageService,
  ],
})
export class AppManagerModule {}
