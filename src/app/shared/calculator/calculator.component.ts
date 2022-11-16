import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rates } from 'src/app/core/interface/payload.interface';
import { State } from 'src/app/core/interface/state.interface';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {
  @Input() ratesData$!: Observable<Rates | undefined>;
  @Input() state$!: Observable<State>;
  @Input() page!: string;

  loadFinished$!: Observable<{ text: string }>;

  constructor(public state: StateService, private router: Router) {}

  formChanged(state: State, swap?: boolean) {
    if (swap) {
      if (this.page !== 'home') {
        return;
      }
      state = { ...state, to: state.from, from: state.to };
    }
    if (this.page === 'home') {
      this.state.setState(state);
    } else {
      this.router.navigate(['/details', state.from, state.to]);
    }
  }

  ngOnInit(): void {
    this.loadFinished$ = this.state.getErrors();
  }
}
