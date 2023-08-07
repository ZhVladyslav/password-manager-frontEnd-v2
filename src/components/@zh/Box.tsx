import React from 'react';
import styled from 'styled-components';
import {
  bgColorStyle,
  contentXStyle,
  contentYStyle,
  heightStyle,
  IBgColor,
  IContentX,
  IContentY,
  IHeight,
  IMargin,
  IMarginContent,
  IPadding,
  IWidth,
  marginContentStyle,
  marginStyle,
  paddingStyle,
  widthStyle,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  sx?: Isx;
}

interface Isx extends IBgColor, IMargin, IPadding, IContentY, IContentX, IHeight, IWidth, IMarginContent {
  // border
  borderRadius?: '4px' | '8px' | '12px' | '16px' | '20px' | '24px' | '50%'; //radius
}

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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px;

  // border
  border-radius: ${(props) => props.sx && props.sx.borderRadius};

  // width
  ${(props) => props.sx && widthStyle(props.sx)}

  // height
  ${(props) => props.sx && heightStyle(props.sx)}

  // margin
  ${(props) => props.sx && marginStyle(props.sx)}

  // padding
  ${(props) => props.sx && paddingStyle(props.sx)}
  
  // background color
  ${(props) => props.sx && bgColorStyle(props.sx)};
`;

const InnerBoxContent = styled.div<{ sx?: Isx }>`
  display: flex;
  width: 100%;
  height: 100%;

  // margin content
  ${(props) => props.sx && marginContentStyle(props.sx)}

  // content positions
  ${(props) => props.sx && contentXStyle(props.sx)}
  ${(props) => props.sx && contentYStyle(props.sx)}
`;

// ----------------------------------------------------------------------

export default Box;
