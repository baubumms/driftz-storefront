import type { IResponsiveImage } from '$/types/ResponsiveImage';

export interface IDatabaseImage {
  alt: string;
  width: number;
  height: number;
  w360: string;
  w720: string;
  w1400: string;
  w2000: string;
  wMax: string;
  fallbackSrc: string;
}

export const toResponsiveImage = (image: IDatabaseImage): IResponsiveImage => {
  const { alt, width, height } = image;
  const srcSet = {
    w360: image.w360,
    w720: image.w720,
    w1400: image.w1400,
    w2000: image.w2000,
    wMax: image.wMax,
    fallbackSrc: image.fallbackSrc
  };

  return {
    alt,
    width,
    height,
    srcSet
  };
};
