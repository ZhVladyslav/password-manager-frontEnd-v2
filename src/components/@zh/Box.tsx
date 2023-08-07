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
  border?: string;
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
  border: ${(props) => props.sx && props.sx.border};
  border-radius: ${(props) => props.sx && props.sx.borderRadius};

  // width
  ${(props) => props.sx && widthStyle({ w: props.sx.w, minW: props.sx.minW, maxW: props.sx.maxW })}

  // height
  ${(props) => props.sx && heightStyle({ h: props.sx.h, minH: props.sx.minH, maxH: props.sx.maxH })}

  // margin
  ${(props) => {
    if (!props.sx) return;
    const { m, mb, mt, ml, mr, mx, my } = props.sx;
    return marginStyle({ m, mb, mt, ml, mr, mx, my });
  }}

  // padding
  ${(props) => {
    if (!props.sx) return;
    const { p, pb, pt, pl, pr, px, py } = props.sx;
    return paddingStyle({ p, pb, pt, pl, pr, px, py });
  }}
  
  // background color
  ${(props) => props.sx && bgColorStyle({ bgColor: props.sx.bgColor, opacity: props.sx.opacity })};
`;

const InnerBoxContent = styled.div<{ sx?: Isx }>`
  display: flex;
  width: 100%;
  height: 100%;

  // margin content
  ${(props) => {
    if (!props.sx) return;
    const { mContent, mbContent, mtContent, mlContent, mrContent, mxContent, myContent } = props.sx;
    return marginContentStyle({ mContent, mbContent, mtContent, mlContent, mrContent, mxContent, myContent });
  }}

  // content positions
  ${(props) => props.sx && contentXStyle({ contentX: props.sx.contentX })}
  ${(props) => props.sx && contentYStyle({ contentY: props.sx.contentY })}
`;

// ----------------------------------------------------------------------

export default Box;
