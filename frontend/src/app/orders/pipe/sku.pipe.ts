import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'skuPipe',
  pure: false,
})
export class SkuPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(obj: Array<any>) {
    const listItem = obj.filter((item) => item.sku !== null && item.sku !== '');

    if (listItem.length >= 2) {
      return this.translocoService.translate('orderPage.table.skuValue', {
        appName: listItem[0].sku,
        length: obj.length - 1,
      });
    }

    if (listItem.length === 1) {
      return this.translocoService.translate('orderPage.table.skuValue', {
        appName: listItem[0].sku,
        length: obj.length - 1,
      });
    }

    return '-';
  }
}
