import { toLinearRgb } from './css.test-utils';

type Rgb = readonly [number, number, number];

/**
 * A linear sRGB channel, clipped to the gamut.
 */
const clip = (value: number) => {
  return Math.min(Math.max(value, 0), 1);
};

/**
 * OKLab coordinates of a linear sRGB colour.
 */
const toOklab = ([red, green, blue]: Rgb) => {
  const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
  const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
  const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

  return [
    0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
    1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
    0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short,
  ] as const;
};

/**
 * Machado, Oliveira and Fernandes (2009) full-severity dichromacy matrices, applied in linear sRGB.
 */
const DICHROMACY_MATRICES = {
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
} as const;

type Vision = 'typical' | keyof typeof DICHROMACY_MATRICES;

export const VISIONS = ['typical', 'protanopia', 'deuteranopia', 'tritanopia'] as const satisfies readonly Vision[];

/**
 * The linear sRGB a reader with the given vision sees for an `oklch()` literal.
 */
const perceive = (oklch: string, vision: Vision) => {
  const rgb = toLinearRgb(oklch);
  if (vision === 'typical') return rgb;

  const [red, green, blue] = DICHROMACY_MATRICES[vision].map((row) => {
    return clip(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2]);
  });

  return [Number(red), Number(green), Number(blue)] as const;
};

/**
 * OKLab distance between two `oklch()` literals as a reader with the given vision sees them, scaled by 100.
 */
export const distance = (one = '', other = '', vision: Vision = 'typical') => {
  const [l1, a1, b1] = toOklab(perceive(one, vision));
  const [l2, a2, b2] = toOklab(perceive(other, vision));

  return 100 * Math.hypot(l1 - l2, a1 - a2, b1 - b2);
};
