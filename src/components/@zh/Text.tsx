import React from 'react';
import styled from 'styled-components';
import {
  height,
  IHeight,
  IMargin,
  IPadding,
  IColorConfig,
  IWidth,
  margin,
  padding,
  colorConfig,
  width,
  color,
  bgColor,
  IColor,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  content?: string;
  variant?: 'span' | 'p' | 'a' | 'b' | 'i' | 'u' | 's' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  to?: string;
  sx?: Isx;
}

interface Isx extends IColor, IMargin, IPadding, IHeight, IWidth {}

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
    ${color(sx)}`;
  }}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  font-weight: 400;
  line-height: 1.71429;
  font-size: 0.875rem;
  text-transform: unset;
`;

// ----------------------------------------------------------------------

export default Text;
