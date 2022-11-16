import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Err } from '../interface/error.interface';
import { Payload } from '../interface/payload.interface';
import { State } from '../interface/state.interface';

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

  private payload: Payload = { date: null };
  private error = new Subject<Err>();
  private state = new Subject<State>();

  savePayload(newPayload: Payload): void {
    this.payload = { ...newPayload };
  }

  getPayload(): Payload | boolean {
    if (this.payload.date) return this.payload;
    else return false;
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

  setState(state?: State) {
    this.state.next(state ? state : this.initialState);
  }
}
