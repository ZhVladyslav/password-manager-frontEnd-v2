import { colorGrayType, colorType, ISetColors, setColor } from './colors';

// ----------------------------------------------------------------------

export interface IBgColor extends Omit<ISetColors, 'color'> {
  bgColor?: colorType | colorGrayType;
}

// ----------------------------------------------------------------------

export const bgColorStyle = (props: IBgColor) => {
  return `background-color: ${setColor({ color: props.bgColor, opacity: props.opacity })};`;
};
