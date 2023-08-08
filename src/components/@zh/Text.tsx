import React from 'react';
import styled from 'styled-components';
import {
  IHeight,
  IMargin,
  IPadding,
  IWidth,
  color,
  IColor,
  height,
  width,
  margin,
  padding,
  whiteSpace,
  IWhiteSpace,
  ITextOverflow,
  textOverflow,
  fontWeight,
  IFontWeight,
  textTransform,
  ITextTransform,
  fontSize,
  IFontSize,
  lineHeight,
  ILineHeight,
  userSelect,
  IUserSelect,
  hyphens,
  IHyphens,
  overflow,
  IOverflow,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  content?: string;
  variant?: 'span' | 'p' | 'a' | 'b' | 'i' | 'u' | 's' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  to?: string;
  sx?: Isx;
}

interface Isx
  extends IColor,
    IMargin,
    IPadding,
    IHeight,
    IWidth,
    IWhiteSpace,
    ITextOverflow,
    IFontWeight,
    ITextTransform,
    ILineHeight,
    IUserSelect,
    IHyphens,
    IOverflow,
    IFontSize {}

// ----------------------------------------------------------------------

const Text: React.FC<IProps> = ({ sx, content, variant }) => {
  return <Span sx={sx}>{content}</Span>;
};

// ----------------------------------------------------------------------

const Span = styled.span<{ sx?: Isx }>`
  ${(props) => {
    if (!props.sx) return '';
    const { sx } = props;

    return `
    ${width(sx)}
    ${height(sx)}
    ${margin(sx)}
    ${padding(sx)}
    ${overflow(sx)}
   
    ${color(sx)}
    ${fontSize(sx)}
    ${fontWeight(sx)}
    ${lineHeight(sx)}
    ${textTransform(sx)}
    ${textOverflow(sx)}
    ${hyphens(sx)}
    ${whiteSpace(sx)}
    ${userSelect(sx)}

    `;
  }}
`;

// ----------------------------------------------------------------------

export default Text;

// text decoration
// z index
// cursor
// text-align
// vertical-align
