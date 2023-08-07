import React from 'react';
import styled from 'styled-components';
import {
  heightStyle,
  IHeight,
  IMargin,
  IPadding,
  ISetColors,
  IWidth,
  marginStyle,
  paddingStyle,
  setColor,
  widthStyle,
} from './styles';

// ----------------------------------------------------------------------

interface IProps {
  content: string;
  variant?: 'span' | 'p' | 'a' | 'b' | 'i' | 'u' | 's' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  to?: string;
  sx?: Isx;
}

interface Isx extends ISetColors, IMargin, IPadding, IHeight, IWidth {}

// ----------------------------------------------------------------------

const Text: React.FC<IProps> = ({ sx, content, variant }) => {
  if (variant === 'a') return <A sx={sx}>{content}</A>;
  if (variant === 'p') return <P sx={sx}>{content}</P>;
  if (variant === 'b') return <B sx={sx}>{content}</B>;
  if (variant === 'i') return <I sx={sx}>{content}</I>;
  if (variant === 'u') return <U sx={sx}>{content}</U>;
  if (variant === 's') return <S sx={sx}>{content}</S>;
  if (variant === 'h1') return <H1 sx={sx}>{content}</H1>;
  if (variant === 'h2') return <H2 sx={sx}>{content}</H2>;
  if (variant === 'h3') return <H3 sx={sx}>{content}</H3>;
  if (variant === 'h4') return <H4 sx={sx}>{content}</H4>;
  if (variant === 'h5') return <H5 sx={sx}>{content}</H5>;
  if (variant === 'h6') return <H6 sx={sx}>{content}</H6>;

  return <Span sx={sx}>{content}</Span>;
};

// ----------------------------------------------------------------------

const A = styled.a<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const P = styled.p<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const B = styled.b<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const I = styled.i<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const U = styled.u<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const S = styled.s<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H1 = styled.h1<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H2 = styled.h2<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H3 = styled.h3<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H4 = styled.h4<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H5 = styled.h5<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const H6 = styled.h6<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

const Span = styled.span<{ sx?: Isx }>`
  ${(props) => props.sx && mainStyles(props.sx)}
`;

// ----------------------------------------------------------------------

const mainStyles = (props: Isx) => {
  return `
    // width
    ${widthStyle(props)}

    // height
    ${heightStyle(props)}

    
    color: ${setColor(props)};

    // margin
    ${() => marginStyle(props)}

    // padding
    ${() => paddingStyle(props)}
  `;
};

// ----------------------------------------------------------------------

export default Text;
