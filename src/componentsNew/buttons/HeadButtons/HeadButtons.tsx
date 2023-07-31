import React, { useState, useEffect } from 'react';
import './HeadButtons.scss';

// ----------------------------------------------------------------------

interface IProps {
  headerButtons: string[];
}

// ----------------------------------------------------------------------

const HeadButtons: React.FC<IProps> = ({ headerButtons }) => {
  const [headerButtonActive, setHeaderButtonActive] = useState<number>(0);
  const [headerButtonsSize, setHeaderButtonsSize] = useState<number[]>([]);

  useEffect(() => {
    const getButtons = document.querySelectorAll('.HeadButtons-Button');
    const buttonWidths = Array.from(getButtons).map((item) => {
      const { width } = item.getBoundingClientRect();
      return width;
    });

    setHeaderButtonsSize(buttonWidths);
  }, []);

  return (
    <div className="HeadButtons-Container">
      <div className="HeadButtons">
        {headerButtons.map((item, i) => (
          <button
            key={i}
            className={`HeadButtons-Button ${headerButtonActive === i ? 'active' : ''}`}
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

export default HeadButtons;
