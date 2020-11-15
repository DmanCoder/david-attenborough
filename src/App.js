import React from 'react';

import logo from './assets/logo/logo-white.png';

import './styles/main.scss';

const App = () => {
  return (
    <div>
      <div className="loading"></div>
      <div className="bg-layer"></div>
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

      <div className="banner">
        <div className="banner__text sahara">
          <span className="banner__line"></span>
          <p className="banner__sub-title">Sahara Desert - Morocco</p>
          <h1 className="banner__title">
            <span>Marrakech</span> <span>Merzouga</span>
          </h1>

          <p className="banner__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
            sunt praesentium deleniti qui autem quaerat aut incidunt aspernatur
            mollitia at consequuntur.
          </p>

          <div className="banner__discover">
            <span className="material-icons">bookmark</span>
            <button>Discover location</button>
          </div>
        </div>

        <div className="banner__slides">
          <div className="banner__gallery">
            <div
              className="banner__gallery-item dolphins"
              data-background="./assets/imgs/dolphins.jpg"
            ></div>
            <div
              className="banner__gallery-item africa"
              data-background="./assets/imgs/africa.jpg"
            ></div>
            <div
              className="banner__gallery-item polar"
              data-background="./assets/imgs/polar.jpg"
            ></div>
            <div
              className="banner__gallery-item eagle"
              data-background="./assets/imgs/eagle.jpg"
            ></div>
            <div
              className="banner__gallery-item madagascar"
              data-background="./assets/imgs/madagascar.jpg"
            ></div>
            <div
              className="banner__gallery-item desert"
              data-background="./assets/imgs/desert.jpg"
            ></div>
          </div>
          <div className="banner__gallery-btn">
            <button></button>

            <div className="progress-bar"></div>

            <div className="progress-number"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
