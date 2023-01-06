import { evaluate } from 'mathjs';

export const calculateStringEquation: (equation: string[], currentValue?: number) => number = (
  equation,
  currentValue
) => {
  const value = currentValue ?? 0;

  if (equation.length === 0) {
    return value;
  }

  let currentEquation = equation[0];

  switch (currentEquation) {
    default:
      return calculateStringEquation(equation.slice(1), evaluate(currentEquation));
  }
};
