import React, { useEffect, useState } from 'react';
import { gsap } from './gsapInit';

// Animations
import loadingAnimation from './animations/loadingAnimation';
import setUpAndPositionPoster from './animations/setUpAndPositionPoster';
import posterExpansionAnimation from './animations/posterExpansionAnimation';

// Logo
import logo from './assets/logo/square.png';

// Styles
import './styles/main.scss';
import bannerTextAnimation from './animations/bannerTextAnimation';

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

window.isLoaded = false;
window.init = false;

const App = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [galleryIndex, setGalleryIndex] = useState(0);

  const introRevealAnimation = () => {
    const introRevealTL = gsap.timeline();

    introRevealTL
      .to('.intro-reveal', {
        delay: 1,
        duration: 1.6,
        ease: 'power4.inOut',
        css: { width: 0 },
      })
      .to('.background', {
        delay: -1.4,
        duration: 1.8,
        ease: 'power4.inOut',
        css: { transform: 'scale(1)' },
      })
      .fromTo(
        '.desert .text',
        { y: 60, autoAlpha: 0 },
        {
          delay: 1.5,
          ease: 'power4.inOut',
          duration: 0.8,
          y: 0,
          stagger: 0.1,
          autoAlpha: 1,
        },
        0
      )
      .fromTo(
        `.desert .banner__title span`,
        { top: '6vw' },
        { delay: 1.8, duration: 1, ease: 'power4.inOut', top: '0vw' },
        0
      )
      .fromTo(
        `.banner__gallery`,
        { x: '50vw' },
        { delay: 1.5, duration: 1.2, ease: 'power4.inOut', x: '0vw' },
        0
      )
      .fromTo(
        `.banner__gallery-btn`,
        { y: '12vw' },
        { delay: 1.4, duration: 1.2, ease: 'power4.inOut', y: '0vw' },
        0
      )
      .fromTo(
        `.navigation ul`,
        { y: '-12vw' },
        {
          delay: 1.4,
          duration: 1.2,
          ease: 'power4.inOut',
          y: '0vw',
          onComplete: () => {
            window.init = true;
            setUpAndPositionPoster();
            loadingAnimation();
          },
        },
        0
      );
  };

  useEffect(() => {
    introRevealAnimation();
    // Animation on desktop only
    if (window.innerWidth >= 1024) {
      window.isLoaded = true;
      window.galleryIndex = 0;

      // Creates gallery poster based on the first item of the gallery
      setUpAndPositionPoster({ galleryIndex, fnc: setGalleryIndex });

      // Setup banner text content
      bannerTextAnimation();
    } else {
      // Clear all animations on mobile
      gsap.set(['.background', '.loading', '.poster'], { clearProps: 'all' });
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
      <div className="intro-reveal"></div>
      <div className="background"></div>
      <div className="poster"></div>
      <div className="dark-layer"></div>
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
        <div className="banner__text">
          {/* Sahara */}
          <div className="banner__content desert">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">Sahara Desert</p>
            <h1 className="banner__title text">
              <p>
                <span>The Great </span>
              </p>
              <p>
                <span>Ubari Sand Sea</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* Dolphins */}
          <div className="banner__content dolphins">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">Creatures of the deep</p>
            <h1 className="banner__title text">
              <p>
                <span>The Blue</span>
              </p>
              <p>
                <span>Planet III</span>
              </p>
            </h1>

            <p className="banner__description text text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* Africa */}
          <div className="banner__content africa">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">The Hunt</p>
            <h1 className="banner__title text">
              <p>
                <span>Planet Earth</span>
              </p>
              <p>
                <span>Predator vs Prey</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* David */}
          <div className="banner__content david">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">A life on our planet</p>
            <h1 className="banner__title text">
              <p>
                <span>Sir David Witness</span>
              </p>
              <p>
                <span>Statement</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* Polar */}
          <div className="banner__content polar">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">Animals of the Arctic</p>
            <h1 className="banner__title text">
              <p>
                <span>Frozen</span>
              </p>
              <p>
                <span>Worlds III</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* Eagle */}
          <div className="banner__content eagle">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">Fishing for a living</p>
            <h1 className="banner__title text">
              <p>
                <span>Birds</span>
              </p>
              <p>
                <span>Of Paradise</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
          </div>

          {/* Madagascar */}
          <div className="banner__content madagascar">
            <span className="banner__line text"></span>
            <p className="banner__sub-title text">The Fate Of Aepyornis</p>
            <h1 className="banner__title text">
              <p>
                <span>Evolution</span>
              </p>
              <p>
                <span>At it's Finest</span>
              </p>
            </h1>

            <p className="banner__description text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus,
              sunt praesentium deleniti qui autem quaerat aut incidunt
              aspernatur mollitia at consequuntur.
            </p>

            <div className="banner__discover text">
              <span className="material-icons">bookmark</span>
              <button>Discover More </button>
            </div>
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
                  <span>THe Blue</span> <span>Planet III</span>
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
                <p className="sub-title">The Hunt</p>
                <h4 className="title">
                  <span>Planet Earth</span> <span>Predator vs Prey</span>
                </h4>
              </div>
            </div>

            <div
              key="david"
              className="banner__gallery-item david"
              data-subject="david"
            >
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">A life on out planet</p>
                <h4 className="title">
                  <span>Sir David Witness</span> <span>Statement</span>
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
                  <span>Frozen</span> <span>Worlds III</span>
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
                  <span>Birds</span> <span> Of Paradise</span>
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
              <span>07</span>
              <span>01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
