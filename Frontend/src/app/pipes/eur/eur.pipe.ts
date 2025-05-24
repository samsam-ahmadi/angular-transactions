import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyCode } from '../../services/transactions/transaction.model';

@Pipe({
  name: 'eur',
})
export class EurPipe implements PipeTransform {
  transform(amount: number, currencyCode: CurrencyCode, currencyRate: number): unknown {
    return currencyCode === 'EUR' ? amount : +(amount * currencyRate).toFixed(2);
  }
}
