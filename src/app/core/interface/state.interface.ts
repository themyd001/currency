export interface State {
  from: string;
  to: string;
  amount: number;
}

export interface PartialState {
  from?: string;
  to?: string;
  amount?: number;
}
