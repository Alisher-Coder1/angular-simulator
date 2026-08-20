import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(
    value: number,
    one: string,
    few: string,
    many: string,
  ): string {
    const normalizedValue = Math.abs(Math.trunc(value));
    const lastTwoDigits = normalizedValue % 100;
    const lastDigit = normalizedValue % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return many;
    }

    if (lastDigit === 1) {
      return one;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    }

    return many;
  }

}