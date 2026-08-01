import { Pipe, PipeTransform } from '@angular/core';

export type PhoneFormat =
  | 'compact'
  | 'international'
  | 'national'
  | 'masked';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  public transform(
    value: string | number | null | undefined,
    mode: PhoneFormat = 'international',
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const originalValue = String(value);
    const digits = originalValue.replace(/\D/g, '');
    const nationalNumber = this.getNationalNumber(digits);

    if (nationalNumber.length !== 10) {
      return originalValue;
    }

    const countryCode = '38';
    const operatorCode = nationalNumber.slice(0, 3);
    const firstGroup = nationalNumber.slice(3, 6);
    const secondGroup = nationalNumber.slice(6, 8);
    const lastGroup = nationalNumber.slice(8, 10);

    switch (mode) {
      case 'compact':
        return `+${countryCode}${nationalNumber}`;

      case 'international':
        return `+${countryCode} ${operatorCode} ${firstGroup} ${secondGroup} ${lastGroup}`;

      case 'national':
        return `${operatorCode} ${firstGroup} ${secondGroup} ${lastGroup}`;

      case 'masked':
        return `+${countryCode} ${operatorCode} *** ** ${lastGroup}`;

      default:
        return originalValue;
    }
  }

  private getNationalNumber(digits: string): string {
    if (digits.length === 12 && digits.startsWith('38')) {
      return digits.slice(2);
    }

    return digits;
  }
}