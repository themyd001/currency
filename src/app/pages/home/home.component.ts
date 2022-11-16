import { Component, OnInit } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { Rates } from 'src/app/core/interface/payload.interface';
import { State } from 'src/app/core/interface/state.interface';
import { HttpService } from '../../core/services/http.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpService, private state: StateService) {}

  payld$!: Observable<Rates | undefined>;
  state$!: Observable<State>;

  popularCurrencies = [
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'CNY',
    'AUD',
    'CAD',
    'CHF',
    'HKD',
  ];

  ngOnInit(): void {
    this.payld$ = this.http.getLatest();
    this.state$ = this.state
      .getState()
      .pipe(startWith(this.state.initialState));
  }
}
