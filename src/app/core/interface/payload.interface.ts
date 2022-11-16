export interface Payload {
  base?: string;
  date?: string | null;
  rates?: Rates;
  symbols: Symbols;
}

export interface Rates {
  [key: string]: number;
}

export interface Symbols {
  [key: string]: string;
}
