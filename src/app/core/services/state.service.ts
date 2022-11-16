import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Err } from '../interface/error.interface';
import { Payload, Rates } from '../interface/payload.interface';
import { PartialState, State } from '../interface/state.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  public initialState = {
    from: 'EUR',
    to: 'USD',
    amount: 1,
  };

  public payload: Payload = { date: null, symbols: {} };

  // private payload: Payload = {
  //   base: 'EUR',
  //   date: '2022-11-16',
  //   rates: {
  //     AED: 3.815677,
  //     AFN: 92.002904,
  //     ALL: 116.503876,
  //     AMD: 410.82604,
  //     ANG: 1.872168,
  //     AOA: 521.428073,
  //     ARS: 168.799158,
  //     AUD: 1.537943,
  //     AWG: 1.872513,
  //     AZN: 1.763923,
  //     BAM: 1.95037,
  //     BBD: 2.097309,
  //     BDT: 106.839814,
  //     BGN: 1.953031,
  //     BHD: 0.391591,
  //     BIF: 2149.512974,
  //     BMD: 1.038842,
  //     BND: 1.421163,
  //     BOB: 7.177842,
  //     BRL: 5.531312,
  //     BSD: 1.038782,
  //     BTC: 6.2903824e-5,
  //     BTN: 84.414341,
  //     BWP: 13.420996,
  //     BYN: 2.623456,
  //     BYR: 20361.303599,
  //     BZD: 2.093819,
  //     CAD: 1.37806,
  //     CDF: 2126.509398,
  //     CHF: 0.979275,
  //     CLF: 0.033335,
  //     CLP: 919.801276,
  //     CNY: 7.363724,
  //     COP: 5070.681397,
  //     CRC: 636.2329,
  //     CUC: 1.038842,
  //     CUP: 27.529314,
  //     CVE: 109.955619,
  //     CZK: 24.353587,
  //     DJF: 184.922356,
  //     DKK: 7.438631,
  //     DOP: 56.581342,
  //     DZD: 143.905955,
  //     EGP: 25.462538,
  //     ERN: 15.58263,
  //     ETB: 55.475676,
  //     EUR: 1,
  //     FJD: 2.304462,
  //     FKP: 0.874063,
  //     GBP: 0.875505,
  //     GEL: 2.825932,
  //     GGP: 0.874063,
  //     GHS: 15.061893,
  //     GIP: 0.874063,
  //     GMD: 63.890776,
  //     GNF: 8946.356901,
  //     GTQ: 8.107505,
  //     GYD: 217.319576,
  //     HKD: 8.126289,
  //     HNL: 25.671386,
  //     HRK: 7.545836,
  //     HTG: 141.890131,
  //     HUF: 408.502814,
  //     IDR: 16220.271538,
  //     ILS: 3.563311,
  //     IMP: 0.874063,
  //     INR: 84.503594,
  //     IQD: 1516.113315,
  //     IRR: 43994.959725,
  //     ISK: 148.907309,
  //     JEP: 0.874063,
  //     JMD: 159.772526,
  //     JOD: 0.737474,
  //     JPY: 145.277927,
  //     KES: 126.728583,
  //     KGS: 87.700808,
  //     KHR: 4304.670864,
  //     KMF: 496.045229,
  //     KPW: 935.008658,
  //     KRW: 1379.504271,
  //     KWD: 0.319922,
  //     KYD: 0.865581,
  //     KZT: 477.776487,
  //     LAK: 17962.750031,
  //     LBP: 1570.611025,
  //     LKR: 381.75446,
  //     LRD: 159.981535,
  //     LSL: 17.993063,
  //     LTL: 3.067431,
  //     LVL: 0.628385,
  //     LYD: 5.089604,
  //     MAD: 11.080583,
  //     MDL: 19.892316,
  //     MGA: 4488.452488,
  //     MKD: 61.442416,
  //     MMK: 2181.453362,
  //     MNT: 3548.495226,
  //     MOP: 8.370164,
  //     MRO: 370.866423,
  //     MUR: 45.419433,
  //     MVR: 16.017379,
  //     MWK: 1066.181228,
  //     MXN: 20.068767,
  //     MYR: 4.721532,
  //     MZN: 66.309295,
  //     NAD: 18.029101,
  //     NGN: 458.846323,
  //     NIO: 37.389976,
  //     NOK: 10.356471,
  //     NPR: 135.062177,
  //     NZD: 1.687061,
  //     OMR: 0.399907,
  //     PAB: 1.038682,
  //     PEN: 3.973838,
  //     PGK: 3.66026,
  //     PHP: 59.624319,
  //     PKR: 230.8716,
  //     PLN: 4.70616,
  //     PYG: 7369.834512,
  //     QAR: 3.782164,
  //     RON: 4.921514,
  //     RSD: 117.28007,
  //     RUB: 62.759047,
  //     RWF: 1108.357429,
  //     SAR: 3.904527,
  //     SBD: 8.550285,
  //     SCR: 13.338246,
  //     SDG: 590.562008,
  //     SEK: 10.871797,
  //     SGD: 1.423323,
  //     SHP: 1.430898,
  //     SLE: 18.725278,
  //     SLL: 18725.127631,
  //     SOS: 590.575363,
  //     SRD: 31.486988,
  //     STD: 21501.932408,
  //     SVC: 9.088472,
  //     SYP: 2610.136424,
  //     SZL: 17.897899,
  //     THB: 37.117808,
  //     TJS: 10.491179,
  //     TMT: 3.646335,
  //     TND: 3.345589,
  //     TOP: 2.457485,
  //     TRY: 19.334306,
  //     TTD: 7.054188,
  //     TWD: 32.339362,
  //     TZS: 2422.365547,
  //     UAH: 38.31026,
  //     UGX: 3895.358417,
  //     USD: 1.038842,
  //     UYU: 41.410282,
  //     UZS: 11618.195915,
  //     VEF: 965653.387393,
  //     VND: 25747.699475,
  //     VUV: 124.271509,
  //     WST: 2.852983,
  //     XAF: 654.129077,
  //     XAG: 0.047947,
  //     XAU: 0.000584,
  //     XCD: 2.807523,
  //     XDR: 0.789313,
  //     XOF: 654.119658,
  //     XPF: 120.692122,
  //     YER: 259.865963,
  //     ZAR: 17.975809,
  //     ZMK: 9350.819171,
  //     ZMW: 17.200685,
  //     ZWL: 334.506707,
  //   },
  // };

  private error = new Subject<Err>();
  private state = new Subject<State>();

  savePayload(newPayload: Payload): void {
    this.payload = { ...this.payload, ...newPayload };
    console.log(this.payload);
  }

  getPayload(): Payload | boolean {
    if (this.payload.date) return this.payload;
    else return false;
  }

  getRates(): Observable<Rates | undefined> {
    return new Observable((subscriber) => {
      subscriber.next(this.payload.rates);
    });
  }

  getSymbolName(symbol: string): string {
    return this.payload.symbols[symbol]
      ? this.payload.symbols[symbol]
      : 'Currency Exchanger';
  }

  errorPayload(err: Error): void {
    this.error.next({ text: err.message });
  }

  getErrors() {
    return this.error.asObservable();
  }

  getState() {
    return this.state.asObservable();
  }

  setState(state?: PartialState) {
    if (state) {
      this.initialState = { ...this.initialState, ...state };
      console.log(this.initialState);
    }
    this.state.next(this.initialState);
  }
}
