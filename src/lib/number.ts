import { filledString } from '$lib/string';

export const numberToString = (
  number: number,
  decimalPlaces: number,
  decimalSeperator?: string
) => {
  const value = roundToDecimalPlaces(number, decimalPlaces);
  let strValue = value.toString();
  const seperator = decimalSeperator ?? ',';

  strValue = strValue.replace('.', seperator);
  let split = strValue.split(seperator);
  if (split.length == 1) {
    if (decimalPlaces > 0) {
      strValue += seperator + filledString('0', decimalPlaces);
    }
  } else if (split[1].length !== decimalPlaces) {
    strValue += filledString('0', decimalPlaces - split[1].length);
  }

  return strValue;
};

export const roundToDecimalPlaces = (value: number, decimalPlaces: number) => {
  const mult = Math.pow(10, decimalPlaces);
  return Math.round(value * mult) / mult;
};
