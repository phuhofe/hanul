import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RowNamePipeModule } from '@app/pipes/row-name.module';
import { ManagerPageService } from '@app/app-manager/services/manager-page.service';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';

import { containers } from './containers';
import { components } from './components';
import { AccountsService } from './services/accounts.service';
import { AccountsRoutingModule } from './accounts-routing.module';

const MATERIALMODULE = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [containers, components,],
  imports: [CommonModule, AccountsRoutingModule, RowNamePipeModule, TranslocoLoaderModule,  ...MATERIALMODULE],
  providers: [AccountsService, ManagerPageService],
})
export class AccountsModule {}
