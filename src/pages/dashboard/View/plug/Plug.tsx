import React from 'react';
import Logo from '../../../../assets/logo.png';
import './Plug.scss';

// ----------------------------------------------------------------------

const Plug: React.FC = () => {
  return (
    <div className="Plug-Container">
      <img src={Logo} />
      <span className="descriptionProject">
        {`This project `}
        <a
          href="https://github.com/ZhVladyslav/passwordManager-web-react"
          target="_blank"
          rel="noreferrer"
        >{`'Password manager'`}</a>
        {` is designed and implemented to show my skills in web technologies and SPA development on React`}
      </span>

      <span className="network">
        {`My email: `}
        <a>{`ZhVladyslav03@gmail.com`}</a>
      </span>

      <span className="network gitHub">
        {`My GitHub: `}
        <a href="https://github.com/ZhVladyslav" target="_blank" rel="noreferrer">{`ZhVladyslav`}</a>
      </span>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Plug;
