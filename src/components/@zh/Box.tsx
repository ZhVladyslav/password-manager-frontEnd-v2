import React from 'react';
import styled from 'styled-components';
import {
  bgColor,
  contentX,
  contentY,
  height,
  IBgColor,
  IContentX,
  IContentY,
  IHeight,
  IMargin,
  IMarginContent,
  IPadding,
  IWidth,
  marginContent,
  margin,
  padding,
  width,
  IBRadius,
  bRadius,
  overflow,
  IOverflow,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  children?: React.ReactNode;
  sx?: Isx;
}

interface Isx
  extends IBgColor,
    IMargin,
    IPadding,
    IContentY,
    IContentX,
    IHeight,
    IWidth,
    IMarginContent,
    IBRadius,
    IOverflow {}

// ----------------------------------------------------------------------

const Box: React.FC<IProps> = ({ sx, children }) => {
  return (
    <BoxContent sx={sx}>
      <InnerBoxContent sx={sx}>{children}</InnerBoxContent>
    </BoxContent>
  );
};

// ----------------------------------------------------------------------

const BoxContent = styled.div<{ sx?: Isx }>`
  ${(props) => {
    if (!props.sx) return '';
    const { sx } = props;

    return `
    ${width(sx)}
    ${height(sx)}
    ${margin(sx)}
    ${padding(sx)}
    ${bgColor(sx)}
    ${bRadius(sx)}
    `;
  }}
`;

//box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px;

const InnerBoxContent = styled.div<{ sx?: Isx }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  ${(props) => {
    if (!props.sx) return '';
    const { sx } = props;

    return `
    ${marginContent(sx)}
    ${contentX(sx)}
    ${contentY(sx)}
    ${overflow(sx)}
    `;
  }}
`;

// ----------------------------------------------------------------------

export default Box;
