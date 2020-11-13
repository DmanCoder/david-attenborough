import React from 'react';

import logo from './assets/logo/logo-white.png';

import './styles/main.scss';

const App = () => {
  return (
    <div>
      <div className="loading"></div>
      <div className="navigation">
        <ul>
          <li>
            <img src={logo} alt="Logo" />
          </li>
          <li>
            <span className="navigation__active">home</span>
          </li>
          <li>
            <span>holiday</span>
          </li>
          <li>
            <span>destinations</span>
          </li>
          <li>
            <span>flights</span>
          </li>
          <li>
            <span>offers</span>
          </li>
          <li>
            <span>contacts</span>
          </li>
          <li>
            <span className="material-icons">search</span>
          </li>
          <li>
            <span className="material-icons">person</span>
          </li>
          <li>
            <span className="material-icons">menu</span>
          </li>
        </ul>
      </div>

      <div className="banner"></div>
    </div>
  );
};

export default App;
