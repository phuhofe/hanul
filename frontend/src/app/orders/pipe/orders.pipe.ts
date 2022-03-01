import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({ name: 'ordersPipe', pure: false })
export class OrdersPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {  }

  transform(obj: Array<any>) {
    const listItem = obj.filter(
      (item) => item.app_name !== null && item.app_name !== ''
    );

    if(obj.length - 1 === 0) {
      return listItem[0]?.app_name ?? '-';
    }
    
    if (listItem.length >= 2) {
      return this.translocoService.translate('orderPage.table.ordersValue', {
        appName: listItem[0].app_name,
        length: obj.length - 1,
      });
    }

    if (listItem.length === 1) {
      return this.translocoService.translate('orderPage.table.ordersValue', {
        appName: listItem[0].app_name,
        length: obj.length - 1,
      });

    }

    if (!!listItem) {
      return `${obj.length} orders`;
    }
  }
}
