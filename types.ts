
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface ColorData {
  hex: string;
  rgb: RGBColor;
}

export type PaletteScale = Record<string, ColorData>;

export interface PaletteEntry extends ColorData {
  name: string;
}
