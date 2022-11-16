import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit, OnChanges {
  @Input() isFinished$!: Observable<{ text: string }>;

  constructor() {}

  ngOnChanges() {}

  ngOnInit(): void {}
}
