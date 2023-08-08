type sizeType =
  | '0.625' // 10px
  | '0.75' // 12px
  | '0.875' // 14px
  | '1.125' // 18px
  | '1.25' // 20px
  | '1.375' // 22px
  | '1.5' // 24px
  | '1.625' // 26px
  | '1.75' // 28px
  | '1.875' // 30px
  | '1' // 16px
  | '2'; // 32px

// font size
interface IFontSize {
  fontSize?: `${sizeType}rem`;
}

// line height
interface ILineHeight {
  lineHeight?: `${sizeType}rem`;
}

// font weight
interface IFontWeight {
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

// hyphens
export interface IHyphens {
  hyphens?: 'none' | 'manual' | 'auto';
}

// text align
interface ITextAlign {
  textAlign?: 'start' | 'end' | 'center' | 'justify';
}

// text decoration
type lineType = 'underline' | 'overline' | 'line-through';
type lineStyleType = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
interface ITextDecoration {
  textDecoration?: 'none' | lineType | `${lineType} ${lineStyleType}`;
}

// text overflow
interface ITextOverflow {
  textOverflow?: 'clip' | 'ellipsis';
}

// text transform
interface ITextTransform {
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
}

// user select
interface IUserSelect {
  userSelect?: 'auto' | 'none';
}

// vertical align
interface IVerticalAlign {
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'sub' | 'text-top' | 'text-bottom';
}

// white space
interface IWhiteSpace {
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
}

// ----------------------------------------------------------------------

export interface ITextStyles
  extends IFontSize,
    ILineHeight,
    IFontWeight,
    IHyphens,
    ITextAlign,
    ITextDecoration,
    ITextOverflow,
    ITextTransform,
    IUserSelect,
    IVerticalAlign,
    IWhiteSpace {}

// ----------------------------------------------------------------------

export const textStyles = ({
  fontSize,
  lineHeight,
  fontWeight,
  hyphens,
  textAlign,
  textDecoration,
  textOverflow,
  textTransform,
  userSelect,
  verticalAlign,
  whiteSpace,
}: ITextStyles) => {
  let returnStyles = '';

  if (fontSize) returnStyles += `font-size: ${fontSize};`;
  if (lineHeight) returnStyles += `line-height: ${lineHeight};`;
  if (fontWeight) returnStyles += `font-weight: ${fontWeight};`;
  if (hyphens) returnStyles += `hyphens: ${hyphens};`;
  if (textAlign) returnStyles += `text-align: ${textAlign};`;
  if (textDecoration) returnStyles += `text-decoration: ${textDecoration};`;
  if (textOverflow) returnStyles += `text-overflow: ${textOverflow};`;
  if (textTransform) returnStyles += `text-transform: ${textTransform};`;
  if (userSelect) returnStyles += `user-select: ${userSelect};`;
  if (verticalAlign) returnStyles += `vertical-align: ${verticalAlign};`;
  if (whiteSpace) returnStyles += `white-space: ${whiteSpace};`;

  return returnStyles;
};
