import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
// import { AuthService } from '@auth0/auth0-angular';
import { TranslocoService } from '@ngneat/transloco';

import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = '한울F&S';
  currentLanguage = '';
  isChangeSidebar = false;

  @Output() onSideNavChange = new EventEmitter();

  constructor(
    private translationService: TranslocoService,
    public dialog: MatDialog,
    // public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {}

  changeLanguage(language: string) {
    this.translationService.setActiveLang(language);
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.auth.logout({ returnTo: this.doc.location.origin });
      }
    });
  }

  sideNavChange() {
    this.isChangeSidebar = !this.isChangeSidebar;
    this.layoutService.changeStatusSideBar(this.isChangeSidebar);
  }
}
