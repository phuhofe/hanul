import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';

import { CalculatorModule } from '@app/calculator/calculator.module';
import { ConfirmLogoutDialogComponent } from './confirm-logout-dialog/confirm-logout-dialog.component';
import { LayoutService } from './services/layout.service';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    ConfirmLogoutDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,

    TranslocoLoaderModule,

    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatButtonModule,
    OverlayModule,
    MatDialogModule,
    MatExpansionModule,
    MatTreeModule,

    CalculatorModule,
  ],
  providers:[
    LayoutService
  ]
})
export class HanulLayoutModule {}
