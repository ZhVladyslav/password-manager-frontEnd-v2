export interface IFontWeight {
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export const fontWeight = (props: IFontWeight) => {
  if (!props.fontWeight) return '';

  return `font-weight: ${props.fontWeight};`;
};
