import { colorGrayType, colorType, IColorConfig, colorConfig } from './colorConfig';

// ----------------------------------------------------------------------

export interface IBgColor extends Omit<IColorConfig, 'color'> {
  bgColor?: colorType | colorGrayType;
}

// ----------------------------------------------------------------------

export const bgColor = (props: IBgColor) => {
  return `background-color: ${colorConfig({ color: props.bgColor, opacity: props.opacity })};`;
};
