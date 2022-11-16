import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payload, Symbols } from '../interface/payload.interface';
import { catchError, tap, map, concatMap } from 'rxjs/operators';
import { StateService } from './state.service';
import { EMPTY, Observable } from 'rxjs';
import { TimeLine } from '../interface/timeline.inteface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private state: StateService) {}

  headers = new HttpHeaders({
    apikey: 'jw0fcs9oVlFcIViHXo8S5WyBeP7DU0s4',
    // apikey: 'BeeewPsuaN54vUmET58MtCHDiPNAccGvBj1',
  });

  getLatest() {
    let url = 'https://api.apilayer.com/fixer/latest?base=EUR';
    let url2 = 'https://api.apilayer.com/fixer/symbols';

    return this.http
      .get<{ success: boolean; symbols: Symbols }>(url2, {
        headers: this.headers,
      })
      .pipe(
        tap((x) => {
          console.log(x);
          this.state.savePayload({ symbols: x.symbols });
          this.state.setState();
        }),
        catchError((x) => {
          this.state.errorPayload(x);
          return EMPTY;
        }),
        concatMap((x) =>
          this.http
            .get<Payload>(url, {
              headers: this.headers,
            })
            .pipe(
              tap((x) => {
                console.log(x);
                this.state.savePayload(x);
                this.state.setState();
              }),
              map((x) => x.rates),
              catchError((x) => {
                this.state.errorPayload(x);
                return EMPTY;
              })
            )
        )
      );
  }

  getTimeLine(base: string, symbol: string) {
    var endDate = new Date().toISOString().slice(0, 10);
    var startDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    )
      .toISOString()
      .slice(0, 10);

    let url = `https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbol}`;

    return this.http
      .get<TimeLine>(url, {
        headers: this.headers,
      })
      .pipe(
        map((x) => x.rates),
        catchError((x) => {
          console.log(x, 'erro');
          this.state.errorPayload(x);
          return EMPTY;
        })
      );
  }
}
