import { Currency, CurrencySymbol } from "@/types/Currency";
import { Product } from "@/types/Order";

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

export const calculateTotalInterest = (product: Product): number => {
  if (!product.quantity) return 0;

  const interestRate = 0.15;
  const totalPrice = product.price * product.quantity;
  const interest = totalPrice * interestRate;
  return interest;
};

export function calculateTotalProduct(product: Product): number {
  if (!product.quantity) return 0;
  return product.price * product.quantity + calculateTotalInterest(product);
}

export function calculateTotalOrder(products: Product[]): number {
  let total = 0;

  for (const product of products) {
    total += calculateTotalProduct(product);
  }

  return total;
}
