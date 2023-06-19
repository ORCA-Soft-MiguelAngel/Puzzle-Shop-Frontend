export type CurrencySymbol = "$" | "€" | "L";

export interface Currency {
  type: "USD" | "EUR" | "HNL";
  symbol: CurrencySymbol;
  multiplier: number;
}
