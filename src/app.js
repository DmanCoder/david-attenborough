import React, { useEffect, useState } from 'react';
import { gsap, CSSRulePlugin } from './gsapInit';

// Animations
import loadingAnimation from './animations/loadingAnimation';
import setUpAndPositionPoster from './animations/setUpAndPositionPoster';
import posterExpansionAnimation from './animations/posterExpansionAnimation';

// Logo
import logo from './assets/logo/square.png';

// Styles
import './styles/main.scss';

// Time out debounce
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

const galleryElementArr = [];

window.isLoaded = false;

const App = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    gsap.to('body', { css: { visibility: 'visible' } });

    // Animation on desktop only
    if (window.innerWidth >= 1024) {
      window.isLoaded = true;
      window.galleryIndex = 0;

      // Creates gallery poster based on the first item of the gallery
      setUpAndPositionPoster({ galleryIndex, fnc: setGalleryIndex });
      /*
       * This function is called every 8 seconds
       * Execute `posterExpansionAnimation` onComplete
       */

      loadingAnimation(
        { galleryIndex, fnc: setGalleryIndex },
        posterExpansionAnimation
      );
    } else {
      // Clear all animations on mobile
      gsap.set(['body', '.loading', '.poster'], { clearProps: 'all' });
    }

    // Update height and width on window resize
    const debouncedHandleResize = debounce(function handleResize() {
      setUpAndPositionPoster({ galleryIndex, fnc: setGalleryIndex });
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <span>About</span>
          </li>
          <li>
            <span>News</span>
          </li>
          <li>
            <span>Resources</span>
          </li>
          <li>
            <span>Save Our planet</span>
          </li>
          <li>
            <span>Events</span>
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
            <button>Discover More </button>
          </div>
        </div>

        <div className="banner__slides">
          <div className="banner__gallery">
            <div
              key="dolphins"
              className="banner__gallery-item dolphins"
              data-subject="dolphins"
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
              key="africa"
              className="banner__gallery-item africa"
              data-subject="africa"
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
              key="polar"
              className="banner__gallery-item polar"
              data-subject="polar"
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
              key="eagle"
              className="banner__gallery-item eagle"
              data-subject="eagle"
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
              key="madagascar"
              className="banner__gallery-item madagascar"
              data-subject="madagascar"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">The fate of Aepyornis</p>
                <h4 className="title">
                  <span>Evolution</span> <span>at its finest</span>
                </h4>
              </div>
            </div>

            <div
              key="desert"
              className="banner__gallery-item desert"
              data-subject="desert"
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
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
              <span>06</span>
              <span>01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
