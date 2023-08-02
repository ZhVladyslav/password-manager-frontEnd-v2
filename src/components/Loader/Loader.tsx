import React from 'react';
import './Loader.scss';

// ----------------------------------------------------------------------

const Loader: React.FC = () => {
  return (
    <div className="LoaderDefault-Container">
      <div className="LoaderDefault">
        <span className="loader">
          <span className="firstLine" />
          <span className="secondLine" />
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Loader;
