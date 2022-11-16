import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payload } from '../interface/payload.interface';
import { catchError, tap, map } from 'rxjs/operators';
import { StateService } from './state.service';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private state: StateService) {}

  headers = new HttpHeaders({
    apikey: '6YnWHg18ctde219yTbz9shJVV1YgHa6f',
    // apikey: 'BeeewPsuaN54vUmET58MtCHDiPNAccGvBj1',
  });

  getLatest() {
    let url = 'https://api.apilayer.com/fixer/latest?base=EUR';
    return this.http
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
          console.log(x, 'erro');
          this.state.errorPayload(x);
          return EMPTY;
        })
      );
  }
}
