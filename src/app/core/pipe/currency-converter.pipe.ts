import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../services/state.service';

@Pipe({
  name: 'currencyConverter',
  pure: false,
})
export class CurrencyConverterPipe implements PipeTransform {
  constructor(private state: StateService) {}
  transform(
    value: number,
    fromCurrency: string,
    toCurrency: string
  ): number | string {
    let payload = this.state.getPayload();
    let nf = new Intl.NumberFormat('en-US');

    if (typeof payload === 'object' && payload.rates) {
      if (
        payload.rates.hasOwnProperty(fromCurrency) &&
        payload.rates.hasOwnProperty(toCurrency)
      ) {
        return nf.format(
          +(
            value *
            (payload.rates[toCurrency] / payload.rates[fromCurrency])
          ).toFixed(4)
        );
      } else {
        return '--';
      }
    }

    return '--';
  }
}
