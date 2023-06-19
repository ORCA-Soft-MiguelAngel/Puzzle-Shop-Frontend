import { Currency, CurrencySymbol } from "@/types/Currency";

export const CURRENCIES: Currency[] = [
  {
    type: "USD",
    symbol: "$",
    multiplier: 1,
  },
  {
    type: "EUR",
    symbol: "€",
    multiplier: 1.07,
  },
  {
    type: "HNL",
    symbol: "L",
    multiplier: 24,
  },
];

export const convertCurrency = (symbol: CurrencySymbol, price: number) => {
  switch (symbol) {
    case "$":
      return price * 1;
    case "€":
      return price * 1.07;
    case "L":
      return price * 24;
    default:
      return price * 1;
  }
};

export const formatCurrency = (
  price: number,
  currency: CurrencySymbol
): string => {
  return `${currency} ${convertCurrency(currency, price).toFixed(2)}`;
};
