
import type { RGBColor, PaletteScale } from '../types';

/**
 * Converts a HEX color string to an RGB object.
 */
export const hexToRgb = (hex: string): RGBColor => {
  let hexValue = hex.startsWith('#') ? hex.slice(1) : hex;
  if (hexValue.length === 3) {
    hexValue = hexValue.split('').map(char => char + char).join('');
  }
  const bigint = parseInt(hexValue, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

/**
 * Converts an RGB color object to a HEX string.
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toLowerCase();
};

/**
 * Mixes two RGB colors by a given ratio.
 */
const mixColors = (color1: RGBColor, color2: RGBColor, weight: number): RGBColor => {
  const p = weight;
  const w = p * 2 - 1;
  const a = 0; // alpha of color2

  const w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2;
  const w2 = 1 - w1;

  return {
    r: Math.round(w1 * color1.r + w2 * color2.r),
    g: Math.round(w1 * color1.g + w2 * color2.g),
    b: Math.round(w1 * color1.b + w2 * color2.b),
  };
};

/**
 * Generates a 9-step color scale from a single base HEX color.
 */
export const generateColorScale = (baseHex: string): PaletteScale => {
  const baseRgb = hexToRgb(baseHex);
  const scale: PaletteScale = {};
  const stops = [0.9, 0.75, 0.6, 0.3, 0, -0.25, -0.5, -0.7, -0.85];
  const labels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  // Custom logic to add 50 and adjust base to 500
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  const lightStops = [0.9, 0.8, 0.6, 0.4];
  lightStops.forEach((stop, index) => {
    const mixed = mixColors(white, baseRgb, stop);
    scale[labels[index]] = { rgb: mixed, hex: rgbToHex(mixed.r, mixed.g, mixed.b) };
  });

  scale[500] = { rgb: baseRgb, hex: baseHex };

  const darkStops = [0.2, 0.4, 0.6, 0.8];
  darkStops.forEach((stop, index) => {
      const mixed = mixColors(black, baseRgb, stop);
      scale[labels[index + 5]] = { rgb: mixed, hex: rgbToHex(mixed.r, mixed.g, mixed.b) };
  });

  return scale;
};

/**
 * Calculates the relative luminance of an RGB color.
 */
export const getLuminance = (rgb: RGBColor): number => {
  const a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculates the contrast ratio between two RGB colors.
 */
export const getContrastRatio = (rgb1: RGBColor, rgb2: RGBColor): number => {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};
