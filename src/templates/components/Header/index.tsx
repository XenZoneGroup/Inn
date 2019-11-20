import * as React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import SOME_PARTNERLogo from '../../../images/SOME_PARTNER.svg';
import koothLogo from '../../../images/logo.kooth.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link title="home" to="/">
          <img className="kooth" src={koothLogo} alt="Kooth logo" />
        </Link>
        <span className="tag-line">in association with</span>
        <img
          className="SOME_PARTNER"
          src={SOME_PARTNERLogo}
          alt="SOME_PARTNER logo"
        />
      </div>
    </header>
  );
};

export { Header };
