import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({ name: 'countPrice', pure: false  })
export class CountPrice implements PipeTransform {

  constructor(private translocoService: TranslocoService) {
  }

  transform(obj: Array<any>) {
    const prices = obj.map((item: any) => {
      return item.price
    });
    
    const reducer = (previousValue: any, currentValue: any) => {
      return previousValue + currentValue;
    }

    let total = prices.reduce(reducer);

    if(total > 0 && prices.some(price => price === null)) {
      total =  total + ' ' + this.translocoService.translate('orderPage.table.andMore');;
    }

    if(total === 0 && prices.every(price => price === null)) {
      total = '-'
    }

    return total;
  }
}
