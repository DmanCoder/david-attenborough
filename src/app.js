import React, { useEffect } from 'react';
import { gsap, CSSRulePlugin } from './gsapInit';

import logo from './assets/logo/square.png';
import dolphinsIMG from './assets/imgs/doliphins.jpg';
import africaIMG from './assets/imgs/africa.jpg';
import desertIMG from './assets/imgs/desert.jpg';
import eagleIMG from './assets/imgs/eagle.jpg';
import madagascarIMG from './assets/imgs/madagascar.jpg';
import polarIMG from './assets/imgs/polar.jpg';

import './styles/main.scss';

const imgObj = {
  dolphins: dolphinsIMG,
  africa: africaIMG,
  desert: desertIMG,
  eagle: eagleIMG,
  madagascar: madagascarIMG,
  polar: polarIMG,
};

const loadingAnimation = (posterExpansionAnimation) => {
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
    .set('.loading', {
      clearProps: 'all',
      onComplete: () => posterExpansionAnimation(),
    });
};

const createAndPositionInitialGalleryItem = () => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  // Get the first index of the array
  const glFirst = glItem[0];

  // Get x/y coordinates and width/height
  const glFirstAttr = glFirst.getBoundingClientRect();

  //  Get data attribute
  const subject = glFirst.dataset.subject;

  // Create background string
  const rgba = 'rgba(0, 0, 0, 0.3)';
  const bgLinear = `linear-gradient(${rgba}, ${rgba})`;
  const bgURL = `url('${imgObj[subject]}') no-repeat center / cover`;

  // Position poster over above `glFirst`
  gsap.set('.poster', {
    css: {
      background: bgURL,
      top: glFirstAttr.top,
      left: glFirstAttr.left,
    },
  });
};

const posterExpansionAnimation = () => {
  const posterTL = gsap.timeline();
  const posterAfter = CSSRulePlugin.getRule('.poster::after'); // get the rule

  posterTL
    .to('.poster', {
      duration: 1.25,
      ease: 'power4.inOut',
      css: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,

        borderRadius: '0',
      },
    })
    .to(posterAfter, {
      delay: -0.8,
      duration: 0.5,
      cssRule: { background: 'rgba(0, 0, 0, .3)' },
    });

  // TODO: Add `.shadow-none` to gallery index 1 image
  // TODO: Set Index 1 gallery image to body background
  // TODO: Change z-index to -1 then remove/clear props

  // onComplete: () => {
  // Clear poster animations
  // const clearPosterTL = gsap.timeline();
  // const glFirst = glItem[0];
  // const subject = glFirst.dataset.subject;
  // const bgLinear =
  //   'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))';
  // const bgURL = `url('${imgObj[subject]}') no-repeat center / cover`;
  // const background = `${bgLinear}, ${bgURL}`;
  // clearPosterTL
  //   .set('.poster', { delay: 0.4, clearProps: 'all' })
  //   .to('body', { background }, 0);
  // // .to(glFirst, { background });
  // // TODO: get the first index of image when gallery is updated
  // },
};

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

const App = () => {
  console.log(imgObj);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    gsap.to('body', { css: { visibility: 'visible' } });

    // Animation on desktop only
    if (window.innerWidth >= 1024) {
      // Execute `posterExpansionAnimation` onComplete
      loadingAnimation(posterExpansionAnimation);

      // Creates gallery poster based on the first item of the gallery
      createAndPositionInitialGalleryItem();
    } else {
      // Clear all animations on mobile
      gsap.set(['.loading', '.poster'], { clearProps: 'all' });
    }

    // Update height and width on window resize
    const debouncedHandleResize = debounce(function handleResize() {
      createAndPositionInitialGalleryItem();
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

            <div className="banner__gallery-item africa" data-subject="africa">
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Africa</p>
                <h4 className="title">
                  <span>The</span> <span>Motherland</span>
                </h4>
              </div>
            </div>
            <div className="banner__gallery-item polar" data-subject="polar">
              <div className="banner__gallery-detail">
                <span className="line"></span>
                <p className="sub-title">Animals of the Arctic</p>
                <h4 className="title">
                  <span>Frozen</span> <span>Planet</span>
                </h4>
              </div>
            </div>
            <div className="banner__gallery-item eagle" data-subject="eagle">
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
              data-subject="madagascar"
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
