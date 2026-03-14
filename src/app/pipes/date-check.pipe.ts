import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCheck',
})
export class DateCheckPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    // Your transformation logic goes here
    return `${new Date(value).getTime() < new Date().setUTCHours(0,0,0,0) ? 'PAST' : new Date(value).getTime() > new Date().setUTCHours(0, 0, 0, 0) && new Date(value).getTime() < new Date().setUTCHours(23, 59, 59, 999) ? 'PRESENT' : 'FUTURE'}: ${value}`;
  }

}
