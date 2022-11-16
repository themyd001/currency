import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/interface/state.interface';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { Rates } from 'src/app/core/interface/payload.interface';
import { HttpService } from '../../core/services/http.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  state$!: Observable<State>;
  payld$!: Observable<Rates | undefined>;

  constructor(
    private state: StateService,
    private http: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.payld$ = this.state.getPayload()
      ? this.state.getRates()
      : this.http.getLatest();

    this.route.params.subscribe({
      next: (x) => {
        this.state.setState({ from: x['from'], to: x['to'] });
      },
    });

    this.state$ = this.state
      .getState()
      .pipe(startWith(this.state.initialState));
  }
}
