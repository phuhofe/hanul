import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderUnitValue',
})
export class OrderUnitValuePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : '-';
  }
}
