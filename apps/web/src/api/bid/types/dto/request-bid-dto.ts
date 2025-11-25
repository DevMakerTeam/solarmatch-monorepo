export type RequestBidDto = {
  quoteId: number;
  bidPrice?: number;
  solarModule?: string;
  inverter?: string;
  inverterOrigin?: string;
  structure?: string;
  asInfo?: string;
  memo?: string;
};
