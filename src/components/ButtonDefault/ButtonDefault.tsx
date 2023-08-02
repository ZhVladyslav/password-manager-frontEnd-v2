import React from 'react';
import './ButtonDefault.scss';

// ----------------------------------------------------------------------

type buttonTypes = 'button' | 'submit' | 'reset' | undefined;
type buttonBorderStyleType = 'border';
type buttonBgStyleType = 'bg';
type bgColorsType = 'Red' | 'Blue' | 'White';
type bgType = `${buttonBgStyleType} ${bgColorsType}`;
type styleType = bgType | buttonBorderStyleType;

interface IProps {
  title: string;
  foolSize?: boolean;
  type?: buttonTypes;
  style?: styleType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ----------------------------------------------------------------------

const ButtonDefault: React.FC<IProps> = ({ title, type, onClick, style, foolSize }) => {
  const setStyle = (): string => {
    let styleString = '';

    if (!style) styleString += 'transparent ';

    if (style === 'border') styleString += 'border ';
    if (style === 'bg Blue' || style === 'bg Red' || style === 'bg White') styleString += 'bg ';

    if (style === 'bg White') styleString += 'bgWhite ';
    else if (style === 'bg Blue') styleString += 'bgBlue ';
    else if (style === 'bg Red') styleString += 'bgRed ';

    if (foolSize) styleString += 'width-100 ';

    return styleString;
  };

  return (
    <div className="ButtonDefault-Container">
      <button type={type} className={`ButtonDefault ${setStyle()}`} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

// ----------------------------------------------------------------------

export default ButtonDefault;
