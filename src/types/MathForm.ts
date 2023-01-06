import type { Localized } from './I18n';

export interface IMathFormField {
  id: string;
  title: Localized;
  default: number;
  unit: string;
  equation?: string[];
  decimalPlaces?: number;
  unitLeft?: boolean;
}

export interface IMathForm {
  title: Localized;
  description: Localized;
  fields: IMathFormField[];
}
