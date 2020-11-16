import React, { useEffect } from 'react';
import { gsap } from './gsapInit';

import logo from './assets/logo/square.png';

import './styles/main.scss';

const loadingAnimation = () => {
  const loadingTL = gsap.timeline();
  loadingTL
    .to('.loading', {
      duration: 1,
      css: {
        left: '0',
      },
    })
    .to('.loading', {
      duration: 0.5,
      css: { left: '100%' },
    })
    .set('.loading', { clearProps: 'all' });
};

const setPosterOverlap = () => {
  const glItem = gsap.utils.toArray('.banner__gallery-item');
  const glFirst = glItem[0];
  const glFirstAttr = glFirst.getBoundingClientRect();

  gsap.set('.poster', {
    css: {
      top: glFirstAttr.top,
      left: glFirstAttr.left,
    },
  });
};

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const App = () => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    gsap.to('body', { css: { visibility: 'visible' } });

    // Animation on desktop only
    if (window.innerWidth >= 1024) {
      loadingAnimation();
      setPosterOverlap();
    } else {
      // Clear all animations on mobile
      gsap.set(['.loading', '.poster'], { clearProps: 'all' });
    }

    const debouncedHandleResize = debounce(function handleResize() {
      setPosterOverlap();
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  return (
    <div>
      <div className="poster"></div>
      <div className="loading"></div>
      <div className="navigation">
        <ul>
          <li>
            <img src={logo} alt="Logo" />
            <h5>
              <span>David</span> <span>Attenborough</span>
            </h5>
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
          <p className="banner__sub-title">Sahara Desert</p>
          <h1 className="banner__title">
            <span>The Great </span> <span>Ubari Sand Sea</span>
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
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Creatures of the deep</p>
                <h4 className="title">
                  <span>Blue</span> <span>Planet</span>
                </h4>
              </div>
            </div>

            <div
              className="banner__gallery-item africa"
              data-background="./assets/imgs/africa.jpg"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Africa</p>
                <h4 className="title">
                  <span>The</span> <span>Motherland</span>
                </h4>
              </div>
            </div>
            <div
              className="banner__gallery-item polar"
              data-background="./assets/imgs/polar.jpg"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Animals of the Arctic</p>
                <h4 className="title">
                  <span>Frozen</span> <span>Planet</span>
                </h4>
              </div>
            </div>
            <div
              className="banner__gallery-item eagle"
              data-background="./assets/imgs/eagle.jpg"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Fishing for a living</p>
                <h4 className="title">
                  <span>The</span> <span>Life of birds</span>
                </h4>
              </div>
            </div>
            <div
              className="banner__gallery-item madagascar"
              data-background="./assets/imgs/madagascar.jpg"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Dolphins</p>
                <h4 className="title">
                  <span>Blue</span> <span>Planet</span>
                </h4>
              </div>

              <div
                className="banner__gallery-item desert"
                data-background="./assets/imgs/desert.jpg"
              >
                <div className="banner__gallery-detail">
                  <span className="line"></span>
                  <p className="sub-title">Sahara Desert</p>
                  <h4 className="title">
                    <span>The Great </span> <span>Ubari Sand Sea</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="banner__gallery-btn">
            <button>
              <span className="material-icons">keyboard_arrow_left</span>
              <span className="material-icons">keyboard_arrow_right</span>
            </button>

            <div className="progress-bar">
              <div></div>
            </div>

            <div className="progress-number">
              <span>01</span>
              {/* <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
              <span>06</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
