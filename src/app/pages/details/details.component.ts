import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/core/interface/state.interface';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { Rates } from 'src/app/core/interface/payload.interface';
import { HttpService } from '../../core/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  state$!: Observable<State>;
  payld$!: Observable<Rates | undefined>;
  makeLabels: Array<{ month: number; value: number }> = [];

  constructor(
    private state: StateService,
    private http: HttpService,
    private route: ActivatedRoute
  ) {}

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: '#009fdf',
      },
    ],
  };

  public months: { [key: number]: string } = {
    1: 'JANUARY',
    2: 'FEBRUARY',
    3: 'MARCH',
    4: 'APRIL',
    5: 'MAY',
    6: 'JUNE',
    7: 'JULY',
    8: 'AUGUST',
    9: 'SEPTEMBER',
    10: 'OCTOBER',
    11: 'NOVEMBER',
    12: 'DECEMBER',
  };

  populateGraphChart(from: string, to: string) {
    // RESEST GRAPH
    this.barChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: `${from} - ${to}`,
          backgroundColor: '#009fdf',
        },
      ],
    };

    // GET NEW GRAPH DETAILS
    this.http.getTimeLine(from, to).subscribe({
      next: (timelines) => {
        let i = -2;
        let last_day = 0;
        let last_month = 0;
        for (const timeline in timelines) {
          if (timelines.hasOwnProperty(timeline)) {
            const splitted_date = timeline.split('-');
            if (last_month != +splitted_date[1]) {
              last_month = +splitted_date[1];
              last_day = 0;
              i++;
            }
            if (i >= 0 && last_day < +splitted_date[2]) {
              this.makeLabels[i] = {
                month: last_month,
                value: timelines[timeline][to],
              };
            }
          }
        }

        let labels = [];
        let data = [];

        for (let i = 0; i < this.makeLabels.length; i++) {
          labels.push(this.months[this.makeLabels[i].month]);
          data.push(this.makeLabels[i].value);
        }

        this.barChartData = {
          labels,
          datasets: [
            {
              data,
              label: `${from} - ${to}`,
              backgroundColor: '#009fdf',
            },
          ],
        };
      },
    });
  }

  ngOnInit(): void {
    this.payld$ = this.state.getPayload()
      ? this.state.getRates()
      : this.http.getLatest();

    this.route.params.subscribe({
      next: (x) => {
        this.populateGraphChart(x['from'], x['to']);
        this.state.setState({ from: x['from'], to: x['to'] });
      },
    });

    this.state$ = this.state
      .getState()
      .pipe(startWith(this.state.initialState));
  }
}
