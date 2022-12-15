import { numberToString } from './number';

export const CURRENCY = '€';

export const strPrice = (price: number) => numberToString(price, 2) + CURRENCY;

export const formatPrice = (price: string) => CURRENCY + price;