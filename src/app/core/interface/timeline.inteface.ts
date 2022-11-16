export interface TimeLine {
  base: string;
  date: string | null;
  rates: TimeLineRates;
}

export interface TimeLineRates {
  [date: string]: {
    [currency: string]: number;
  };
}
