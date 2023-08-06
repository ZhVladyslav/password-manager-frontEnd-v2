import React from 'react';
import styled from 'styled-components';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  sx?: Isx;
}

interface Isx {
  // width
  w?: string;
  minW?: string;
  maxW?: string;

  // height
  h?: string;
  minH?: string;
  maxH?: string;

  // padding
  p?: string;
  px?: string; // top and bottom
  py?: string; // left and right
  pt?: string; // top
  pl?: string; // left
  pr?: string; // right
  pb?: string; // bottom

  // margin
  m?: string;
  mx?: string; // top and bottom
  my?: string; // left and right
  mt?: string; // top
  ml?: string; // left
  mr?: string; // right
  mb?: string; // bottom

  //  margin content
  mContent?: string;
  mxContent?: string; // top and bottom
  myContent?: string; // left and right
  mtContent?: string; // top
  mlContent?: string; // left
  mrContent?: string; // right
  mbContent?: string; // bottom

  // content position
  contentX?: 'top' | 'center' | 'bottom';
  contentY?: 'left' | 'center' | 'right' | 'space-between';

  // border
  border?: string;
  borderRadius?: '4px' | '8px' | '12px' | '16px' | '20px' | '24px' | '50%'; //radius

  // background
  bColor?: string; // color
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
  // width
  width: ${(props) => props.sx && props.sx.w};
  min-width: ${(props) => props.sx && props.sx.minW};
  max-width: ${(props) => props.sx && props.sx.maxW};

  // height
  height: ${(props) => props.sx && props.sx.h};
  min-height: ${(props) => props.sx && props.sx.minH};
  max-height: ${(props) => props.sx && props.sx.maxH};

  // margin
  margin: ${(props) => props.sx && props.sx.m};
  margin-top: ${(props) => props.sx && (props.sx.mt || props.sx.mx)};
  margin-bottom: ${(props) => props.sx && (props.sx.mb || props.sx.mx)};
  margin-left: ${(props) => props.sx && (props.sx.ml || props.sx.my)};
  margin-right: ${(props) => props.sx && (props.sx.mr || props.sx.my)};

  // padding
  padding: ${(props) => props.sx && props.sx.p};
  padding-top: ${(props) => props.sx && (props.sx.pt || props.sx.px)};
  padding-bottom: ${(props) => props.sx && (props.sx.pb || props.sx.px)};
  padding-left: ${(props) => props.sx && (props.sx.pl || props.sx.py)};
  padding-right: ${(props) => props.sx && (props.sx.pr || props.sx.py)};

  // border
  border: ${(props) => props.sx && props.sx.border};
  border-radius: ${(props) => props.sx && props.sx.borderRadius};

  // background
  background-color: ${(props) => (props.sx && props.sx.bColor) || 'rgb(33, 43, 54)'};

  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px;
`;

const InnerBoxContent = styled.div<{ sx?: Isx }>`
  display: flex;
  width: 100%;
  height: 100%;

  // content position
  justify-content: ${(props) => {
    if (!props.sx) return undefined;
    if (props.sx.contentY === 'left') return 'flex-start';
    if (props.sx.contentY === 'center') return 'center';
    if (props.sx.contentY === 'right') return 'flex-end';
    if (props.sx.contentY === 'space-between') return 'space-between';
  }};
  align-items: ${(props) => {
    if (!props.sx) return undefined;
    if (props.sx.contentX === 'top') return 'flex-start';
    if (props.sx.contentX === 'center') return 'center';
    if (props.sx.contentX === 'bottom') return 'flex-end';
  }};

  // margin content
  & > * {
    margin: ${(props) => props.sx && props.sx.mContent};
    margin-top: ${(props) => props.sx && (props.sx.mtContent || props.sx.mxContent)};
    margin-bottom: ${(props) => props.sx && (props.sx.mbContent || props.sx.mxContent)};
    margin-left: ${(props) => props.sx && (props.sx.mlContent || props.sx.myContent)};
    margin-right: ${(props) => props.sx && (props.sx.mrContent || props.sx.myContent)};
  }
`;

// ----------------------------------------------------------------------

export default Box;
