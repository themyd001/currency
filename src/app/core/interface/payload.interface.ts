export interface Payload {
  base?: string;
  date: string | null;
  rates?: Rates;
}

export interface Rates {
  [key: string]: number;
}
