import type { IMathForm } from '$types/MathForm';

export const Calculators: Record<string, IMathForm> = {
  'troque-power-rpm': {
    title: { en: 'Torque - Power - RPM - Calculator', de: 'Drehmoment Rechner' },
    description: {
      en: 'This calculator calculates the missing one from RPM, Power and Torque values if you enter in 2 of the 3 values.',
      de: 'Mit diesem Rechner kannst du die Drehzahl deines Motors berechnen, das Drehmoment und die Leistung berechnen. Du brauchst dafür jeweils 2 der 3 Werte.'
    },
    fields: [
      {
        id: 'M',
        title: { en: 'Torque', de: 'Drehmoment' },
        unit: 'Nm',
        equation: ['P/(0.000142379*n)'],
        default: 12.68
      },
      {
        id: 'P',
        title: { en: 'Power', de: 'Leistung' },
        unit: ' PS',
        equation: ['0.000142379*M*n'],
        default: 6.5
      },
      {
        id: 'n',
        title: { en: 'RPM', de: 'Drehzahl' },
        unit: ' RPM',
        equation: ['P/(0.000142379*M)'],
        default: 3600
      }
    ]
  },
  'rpm-vmax-sprocket-size-chainwheel-diameter-pretransmission': {
    title: { en: 'Sprocket - Chainwheel - Calculator', de: 'Ritzel Rechner' },
    description: {
      en: 'Calculate one of Sprocket Size, Chainwheel Size or Wheel Diameter.',
      de: 'Berechne Ritzel- und Kettenblattgröße + den Reifen Durchmesser.'
    },
    fields: [
      {
        id: 'rpm',
        title: { en: 'Motor RPM (max)', de: 'Motor Drehzahl (max)' },
        unit: ' RPM',
        equation: ['(vMax*preTransmission*chainwheel)/(sprocket*pi*diameter*0.0006)'],
        default: 3600,
        decimalPlaces: 0
      },
      {
        id: 'vMax',
        title: { en: 'Theor. max Speed', de: 'Theor. Endgeschwindigkeit' },
        unit: 'km/h',
        equation: ['(sprocket*rpm*pi*diameter*0.0006)/(chainwheel*preTransmission)'],
        default: 45
      },
      {
        id: 'sprocket',
        title: { en: 'Max the', de: 'Anzahl Zähne Ritzel' },
        unit: ' Zähne',
        equation: ['(vMax*preTransmission*chainwheel)/(rpm*pi*diameter*0.0006)'],
        default: 18,
        decimalPlaces: 0
      },
      {
        id: 'chainwheel',
        title: { en: 'Teeth Chainwheel', de: 'Anzahl Zähne Kettenblatt' },
        unit: ' Zähne',
        equation: ['(sprocket*rpm*pi*diameter*0.0006)/(vMax*preTransmission)'],
        default: 76,
        decimalPlaces: 0
      },
      {
        id: 'diameter',
        title: { en: 'Diameter Wheel', de: 'Durchmesser Rad' },
        unit: 'cm',
        equation: ['(vMax*chainwheel)/(sprocket*rpm*pi*0.0006*preTransmission)'],
        default: 28,
        decimalPlaces: 2
      },
      {
        id: 'preTransmission',
        title: { en: '(Pre) Transmission', de: '(Vor) Übersetzung' },
        unit: ':1',
        // equation: [''],
        default: 1,
        decimalPlaces: 0
      }
    ]
  }
};
