import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
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

  constructor(public state: StateService) {}

  formChanged(state: State, swap?: boolean) {
    if (swap) {
      if (this.page !== 'home') {
        return;
      }
      state = { ...state, to: state.from, from: state.to };
    }
    this.state.setState(state);
  }

  ngOnInit(): void {
    this.loadFinished$ = this.state.getErrors();
  }
}
