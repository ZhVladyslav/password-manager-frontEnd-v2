import React from 'react';
import './Block.scss';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  sx?: {
    // width
    w?: string; // 100%
    minW?: string; // 300px
    maxW?: string; // 100%

    // height
    h?: string; // none
    minH?: string; // none
    maxH?: string; // none

    // margin
    mg?: string; // 0
    mgContent?: 'left' | 'right' | 'top' | 'bottom'; // 10px (not edit)

    // padding
    pd?: string; // 0

    verticalContent?: 'left' | 'right' | 'center' | 'spaceBetween'; // left
    horizontalContent?: 'top' | 'bottom' | 'center'; // top
    borderRadius?: '4px' | '8px' | '12px' | '16px' | '24px';
  };
}

// ----------------------------------------------------------------------

const Block: React.FC<IProps> = ({ sx, children }) => {
  const parentStyles: React.CSSProperties = {
    padding: sx?.pd,
    margin: sx?.mg,
    minWidth: sx?.minW,
    width: sx?.w,
    maxWidth: sx?.maxW,
    minHeight: sx?.minH,
    height: sx?.h,
    maxHeight: sx?.maxH,
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

    if (sx?.mgContent === 'left') stylesClass += 'childMargin-left ';
    if (sx?.mgContent === 'right') stylesClass += 'childMargin-right ';
    if (sx?.mgContent === 'top') stylesClass += 'childMargin-top ';
    if (sx?.mgContent === 'bottom') stylesClass += 'childMargin-bottom ';

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
