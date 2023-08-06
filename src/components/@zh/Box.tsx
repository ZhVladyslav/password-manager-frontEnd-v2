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
  bColor?: bColor | bColorGray; // color
  opacity?: '0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
}

type bColorClass = 'Primary' | 'Secondary' | 'Info' | 'Success' | 'Warning' | 'Error';
type bColorSaturation = 'Lighter' | 'Light' | 'Main' | 'Dark' | 'Darker';
type bColor = `${bColorClass} ${bColorSaturation}`;
type bColorGraySaturation = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type bColorGray = `Grey ${bColorGraySaturation}`;

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
  background-color: ${(props) => {
    if (!props.sx) return undefined;

    const opacity = props.sx.opacity || '1';

    // Primary
    if (props.sx.bColor === 'Primary Lighter') return `rgba(209, 233, 252, ${opacity})`;
    if (props.sx.bColor === 'Primary Light') return `rgba(118, 176, 241, ${opacity})`;
    if (props.sx.bColor === 'Primary Main') return `rgba(32, 101, 209, ${opacity})`;
    if (props.sx.bColor === 'Primary Dark') return `rgba(16, 57, 150, ${opacity})`;
    if (props.sx.bColor === 'Primary Darker') return `rgba(6, 27, 100, ${opacity})`;

    // Secondary
    if (props.sx.bColor === 'Secondary Lighter') return `rgba(239, 214, 255, ${opacity})`;
    if (props.sx.bColor === 'Secondary Light') return `rgba(198, 132, 255, ${opacity})`;
    if (props.sx.bColor === 'Secondary Main') return `rgba(142, 51, 255, ${opacity})`;
    if (props.sx.bColor === 'Secondary Dark') return `rgba(81, 25, 183, ${opacity})`;
    if (props.sx.bColor === 'Secondary Darker') return `rgba(39, 9, 122, ${opacity})`;

    // Info
    if (props.sx.bColor === 'Info Lighter') return `rgba(202, 253, 245, ${opacity})`;
    if (props.sx.bColor === 'Info Light') return `rgba(97, 243, 243, ${opacity})`;
    if (props.sx.bColor === 'Info Main') return `rgba(0, 184, 217, ${opacity})`;
    if (props.sx.bColor === 'Info Dark') return `rgba(0, 108, 156, ${opacity})`;
    if (props.sx.bColor === 'Info Darker') return `rgba(0, 55, 104, ${opacity})`;

    // Success
    if (props.sx.bColor === 'Success Lighter') return `rgba(211, 252, 210, ${opacity})`;
    if (props.sx.bColor === 'Success Light') return `rgba(119, 237, 139, ${opacity})`;
    if (props.sx.bColor === 'Success Main') return `rgba(34, 197, 94, ${opacity})`;
    if (props.sx.bColor === 'Success Dark') return `rgba(17, 141, 87, ${opacity})`;
    if (props.sx.bColor === 'Success Darker') return `rgba(6, 94, 73, ${opacity})`;

    // Warning
    if (props.sx.bColor === 'Warning Lighter') return `rgba(255, 245, 204, ${opacity})`;
    if (props.sx.bColor === 'Warning Light') return `rgba(255, 214, 102, ${opacity})`;
    if (props.sx.bColor === 'Warning Main') return `rgba(255, 171, 0, ${opacity})`;
    if (props.sx.bColor === 'Warning Dark') return `rgba(183, 110, 0, ${opacity})`;
    if (props.sx.bColor === 'Warning Darker') return `rgba(122, 65, 0, ${opacity})`;

    // Error
    if (props.sx.bColor === 'Error Lighter') return `rgba(255, 233, 213, ${opacity})`;
    if (props.sx.bColor === 'Error Light') return `rgba(255, 172, 130, ${opacity})`;
    if (props.sx.bColor === 'Error Main') return `rgba(255, 86, 48, ${opacity})`;
    if (props.sx.bColor === 'Error Dark') return `rgba(183, 29, 24, ${opacity})`;
    if (props.sx.bColor === 'Error Darker') return `rgba(122, 9, 22, ${opacity})`;

    // Error
    if (props.sx.bColor === 'Grey 100') return `rgba(249, 250, 251, ${opacity})`;
    if (props.sx.bColor === 'Grey 200') return `rgba(244, 246, 248, ${opacity})`;
    if (props.sx.bColor === 'Grey 300') return `rgba(223, 227, 232, ${opacity})`;
    if (props.sx.bColor === 'Grey 400') return `rgba(196, 205, 213, ${opacity})`;
    if (props.sx.bColor === 'Grey 500') return `rgba(145, 158, 171, ${opacity})`;
    if (props.sx.bColor === 'Grey 600') return `rgba(99, 115, 129, ${opacity})`;
    if (props.sx.bColor === 'Grey 700') return `rgba(69, 79, 91, ${opacity})`;
    if (props.sx.bColor === 'Grey 800') return `rgba(33, 43, 54, ${opacity})`;
    if (props.sx.bColor === 'Grey 900') return `rgba(22, 28, 36, ${opacity})`;
  }};
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
