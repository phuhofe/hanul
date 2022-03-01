import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowName'
})
export class RowNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {    
    return value.replace(/\_/g, " ");
  }

}

