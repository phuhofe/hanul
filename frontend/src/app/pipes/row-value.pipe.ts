import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowValue'
})
export class RowValuePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {   
    if(!value) {
      return 'No value'
    } 

    return value;
  }

}

