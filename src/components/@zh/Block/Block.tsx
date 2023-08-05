import React from 'react';
import './Block.scss';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  sx?: {
    // width
    width?: string; // 100%
    minWidth?: string; // 300px
    maxWidth?: string; // 100%

    // height
    height?: string; // none
    minHeight?: string; // none
    maxHeight?: string; // none

    // margin
    margin?: string; // 0
    marginContent?: 'left' | 'right' | 'top' | 'bottom'; // 10px (not edit)

    // padding
    padding?: string; // 0

    verticalContent?: 'left' | 'right' | 'center' | 'spaceBetween'; // left
    horizontalContent?: 'top' | 'bottom' | 'center'; // top
    borderRadius?: '4px' | '8px' | '12px' | '16px' | '24px';
  };
}

// ----------------------------------------------------------------------

const Block: React.FC<IProps> = ({ sx, children }) => {
  const parentStyles: React.CSSProperties = {
    padding: sx?.padding,
    margin: sx?.margin,
    minWidth: sx?.minWidth,
    width: sx?.width,
    maxWidth: sx?.maxWidth,
    minHeight: sx?.minHeight,
    height: sx?.height,
    maxHeight: sx?.maxHeight,
    borderRadius: sx?.borderRadius,
  };

  const childClass = () => {
    let stylesClass = '';

    if (sx?.verticalContent === 'left') stylesClass += 'verticalContent-Left ';
    if (sx?.verticalContent === 'center') stylesClass += 'verticalContent-Center ';
    if (sx?.verticalContent === 'right') stylesClass += 'verticalContent-Right ';
    if (sx?.verticalContent === 'spaceBetween') stylesClass += 'verticalContent-SpaceBetween ';

    if (sx?.horizontalContent === 'top') stylesClass += 'horizontalContent-Top ';
    if (sx?.horizontalContent === 'center') stylesClass += 'horizontalContent-Center ';
    if (sx?.horizontalContent === 'bottom') stylesClass += 'horizontalContent-Bottom ';

    if (sx?.marginContent === 'left') stylesClass += 'childMargin-left ';
    if (sx?.marginContent === 'right') stylesClass += 'childMargin-right ';
    if (sx?.marginContent === 'top') stylesClass += 'childMargin-top ';
    if (sx?.marginContent === 'bottom') stylesClass += 'childMargin-bottom ';

    return stylesClass;
  };

  return (
    <div className="Block" style={parentStyles}>
      <div className={`inner-Block ${childClass()}`}>{children}</div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Block;
