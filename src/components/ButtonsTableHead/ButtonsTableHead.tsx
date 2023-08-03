import React, { useEffect, useState } from 'react';
import './ButtonsTableHead.scss';

// ----------------------------------------------------------------------

interface IProps {
  buttons: string[];
}

// ----------------------------------------------------------------------

const ButtonsTableHead: React.FC<IProps> = ({ buttons }) => {
  const [headerButtonActive, setHeaderButtonActive] = useState<number>(0);
  const [headerButtonsSize, setHeaderButtonsSize] = useState<number[]>([]);

  useEffect(() => {
    const getButtons = document.querySelectorAll('.ButtonsTableHead-Button');
    const buttonWidths = Array.from(getButtons).map((item) => {
      const { width } = item.getBoundingClientRect();
      return width;
    });

    setHeaderButtonsSize(buttonWidths);
  }, []);

  return (
    <div className="ButtonsTableHead-Container">
      <div className="ButtonsTableHead">
        {buttons.map((item, i) => (
          <button
            key={i}
            className={`ButtonsTableHead-Button ${headerButtonActive === i ? 'active' : ''}`}
            onClick={() => setHeaderButtonActive(i)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="lineContainer">
        <div className="line">
          <span
            className="slider"
            style={{
              width: headerButtonsSize[headerButtonActive],
              left: headerButtonsSize.reduce(
                (prev, curr, i) => (i < headerButtonActive ? prev + curr + 40 : prev + 0),
                0,
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default ButtonsTableHead;
