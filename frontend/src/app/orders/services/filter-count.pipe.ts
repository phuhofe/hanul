import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCount'
})
export class FilterCountPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(!value) {
      return 0;
    }

    return value;
  }

}


