import { colorGrayType, colorType, IColorConfig, colorConfig } from './colorConfig';

// ----------------------------------------------------------------------

export interface IBgColor extends Omit<IColorConfig, 'color'> {
  bgColor?: colorType | colorGrayType;
}

// ----------------------------------------------------------------------

export const bgColor = ({ bgColor, opacity }: IBgColor) => {
  return `background-color: ${colorConfig({ color: bgColor, opacity })};`;
};
