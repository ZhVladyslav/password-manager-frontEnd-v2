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
  overflow,
  IOverflow,
  cursor,
  ICursor,
  IDisplay,
  display,
  textStyles,
  ITextStyles,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  content?: string;
  variant?: 'span' | 'p' | 'a' | 'b' | 'i' | 'u' | 's' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  to?: string;
  sx?: Isx;
}

interface Isx extends IColor, IMargin, IPadding, IHeight, IWidth, IOverflow, ICursor, IDisplay, ITextStyles {}

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
    ${display(sx)}
    ${width(sx)}
    ${height(sx)}
    ${margin(sx)}
    ${padding(sx)}
    ${overflow(sx)}
    ${color(sx)}
    ${cursor(sx)}
    
    ${textStyles(sx)}

    `;
  }}
`;

// ----------------------------------------------------------------------

export default Text;
