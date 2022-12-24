export interface IResponsiveImage {
  alt: string;
  width: number;
  height: number;
  srcSet: {
    w360: string;
    w720: string;
    w1400: string;
    w2000: string;
    wMax: string;
    fallbackSrc: string;
  };
}
