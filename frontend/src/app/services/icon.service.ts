import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export enum Icons {
  HN_Add = 'hn-add',
  HN_Bars = 'hn-bars',
  HN_Delete = 'hn-delete',
  HN_Edit = 'hn-edit',
  HN_Forward = 'hn-forward',
  HN_Done = 'hn-save',
  HN_Search = 'hn-search',
  HN_Location ='hn-location',
  HN_Calendar = 'hn-calendar',
  HN_Menu = 'hn-menu',
}


@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  registerIcons(): void {
    this.loadIcons(Object.values(Icons), '/assets/icons/svg');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
