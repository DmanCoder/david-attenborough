import React, { useEffect, useState } from 'react';
import { gsap, CSSRulePlugin } from './gsapInit';

// Assets
import logo from './assets/logo/square.png';
import dolphinsIMG from './assets/imgs/doliphins.jpg';
import africaIMG from './assets/imgs/africa.jpg';
import desertIMG from './assets/imgs/desert.jpg';
import eagleIMG from './assets/imgs/eagle.jpg';
import madagascarIMG from './assets/imgs/madagascar.jpg';
import polarIMG from './assets/imgs/polar.jpg';

// Styles
import './styles/main.scss';

// All Image URL
const imgURL = {
  dolphins: dolphinsIMG,
  africa: africaIMG,
  desert: desertIMG,
  eagle: eagleIMG,
  madagascar: madagascarIMG,
  polar: polarIMG,
};

// TODO: Create a looping function for `loadingAnimation`
// TODO: Gallery Slide animation
// TODO: Baller text reveal and reveal out animation

// const interval = setInterval(function () {
//   console.log('RUNNING ever 8 sec');
// }, 8000);
// clearInterval(interval);

const moveFirstGalleryImageToEndOfGallery = (state) => {
  // Copy of state
  const el = [...state.elementST]; // E.g: From [8, 1, 2, 3, 4, 5, 6, 7]
  const firstPoster = el.shift();
  el.push(firstPoster); // E.g: To [1, 2, 3, 4, 5, 6, 7, 8]

  /*
   * When state change is triggered it causes a re-render that re-triggers
   * All the animation functions, causing an endless loop that works well with the animations
   * - As planed - :D
   */
  // state.fnc(el);

  // gsap.set('.poster', { color: 'red' });
  console.log(firstPoster);
};

const loadingAnimation = (state, posterExpansionAnimation) => {
  // Loading timeline
  const loadingTL = gsap.timeline();

  // Loading animation
  loadingTL
    .to('.loading', {
      duration: 2.5,
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
      onComplete: () => posterExpansionAnimation(state), // Trigger `posterExpansionAnimation` `onComplete`
    });
};

const setUpAndPositionPoster = (state) => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  // Get rule
  const posterAfter = CSSRulePlugin.getRule('.poster::after');

  // Get the first index of the array
  const glFirst = glItem[0];

  // Get x/y coordinates and width/height
  const glFirstRect = glFirst.getBoundingClientRect();

  //  Get data attribute
  const subject = glFirst.dataset.subject;

  // Create background string
  // const rgba = 'rgba(0, 0, 0, 0.3)';
  // const bgLinear = `linear-gradient(${rgba}, ${rgba})`;
  const bgURL = `url('${imgURL[subject]}') no-repeat center / cover`;

  // Position poster over above `glFirst`
  gsap.set('.poster', {
    css: {
      background: bgURL,
      top: glFirstRect.top,
      left: glFirstRect.left,
      width: glFirstRect.width,
      height: glFirstRect.height,
      borderRadius: '2rem',
      boxShadow: '1.5rem 2rem 1rem rgba(0, 0, 0, 0.25)',
      zIndex: '10',
      // boxShadow: '15px 20px 10px rgba(0, 0, 0, 0.25)',
    },
  });

  // Set background of `::after` to transparent
  gsap.set(posterAfter, {
    cssRule: { background: 'transparent' },
  });

  /* This section makes the `.poster` look like its the first item of the gallery */
  // Add `.shadow-none` to first item in the gallery array
  glFirst.classList.add('shadow-none');

  // Hide background
  gsap.set(glFirst, { css: { background: 'transparent' } });
};

const posterExpansionAnimation = (state) => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  // Get the first index of the array
  const glFirst = glItem.shift();

  // Get the last index of the array
  const glLast = glItem[glItem.length - 1];

  // Get x/y coordinates and width/height
  const glFirstRect = glFirst.getBoundingClientRect();
  const glLastRect = glLast.getBoundingClientRect();

  //  Get data attribute
  const subject = glFirst.dataset.subject;

  // Poster timeline
  const posterTL = gsap.timeline();

  // Get rule
  const posterAfter = CSSRulePlugin.getRule('.poster::after');

  // Create background string
  const rgba = 'rgba(0, 0, 0, 0.3)';
  const bgLinear = `linear-gradient(${rgba}, ${rgba})`;
  const bgURL = `url('${imgURL[subject]}') no-repeat center / cover`;
  const bg = `${bgLinear}, ${bgURL}`;

  /*
   * 1). Expand Poster
   * 2). Fade out poster text
   * 3). Darken `posterAfter`
   * 4). Set current poster to body background image
   * 5). Gallery Slide animation
   * 6). Clear props
   */
  posterTL
    .to('.poster', {
      duration: 1.2,
      ease: 'power4.inOut',
      css: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        borderRadius: '0',
      },
    })
    .to(
      `.${subject} .banner__gallery-detail`,
      {
        delay: 0.2,
        duration: 0.25,
        ease: 'power3.in',
        css: { bottom: -20, autoAlpha: 0 },
      },
      0
    )
    .to(posterAfter, {
      delay: -0.85,
      duration: 1,
      cssRule: { background: 'rgba(0, 0, 0, .3)' },
    })
    .to('body', { css: { background: bg } }, 'bg-switch')
    .to(
      glItem,
      {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        x: -(glFirstRect.width + 30),
        stagger: 0.05,
        onComplete: () => {
          // TODO: Move first gallery index to the last index + width so it creates the illusion its re-ordered
          const glItem = gsap.utils.toArray('.banner__gallery-item');

          const glLength = glItem.length - 1;

          // Get the first index of the array
          const glFirst = glItem[0];

          // Get the last index of the array
          const glLast = glItem[glLength];

          // Get x/y coordinates and width/height
          const glLastRect = glLast.getBoundingClientRect();

          const marginLeftSpacing = 30;
          const spacing = glLength * marginLeftSpacing;
          const posX = glLastRect.width * glLength;

          gsap.set(glFirst, { x: posX + spacing });
        },
      },
      0
    )
    .set(['.poster', `.${subject} .banner__gallery-detail`], {
      clearProps: 'all',
      onComplete: () => {
        setUpAndPositionPoster();
        moveFirstGalleryImageToEndOfGallery(state);
      },
    });
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

const galleryElementArr = [
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
  </div>,
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
  </div>,
  // <div key="polar" className="banner__gallery-item polar" data-subject="polar">
  //   <div className="banner__gallery-detail">
  //     <span className="line"></span>
  //     <p className="sub-title">Animals of the Arctic</p>
  //     <h4 className="title">
  //       <span>Frozen</span> <span>Planet</span>
  //     </h4>
  //   </div>
  // </div>,
  // <div key="eagle" className="banner__gallery-item eagle" data-subject="eagle">
  //   <div className="banner__gallery-detail">
  //     <span className="line"></span>
  //     <p className="sub-title">Fishing for a living</p>
  //     <h4 className="title">
  //       <span>The</span> <span>Life of birds</span>
  //     </h4>
  //   </div>
  // </div>,

  // <div
  //   key="madagascar"
  //   className="banner__gallery-item madagascar"
  //   data-subject="madagascar"
  // >
  //   <div className="banner__gallery-detail">
  //     <span className="line"></span>
  //     <p className="sub-title">The fate of Aepyornis</p>
  //     <h4 className="title">
  //       <span>Evolution</span> <span>at its finest</span>
  //     </h4>
  //   </div>
  // </div>,

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
  </div>,
];

const App = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [galleryArr, setGalleryArr] = useState(galleryElementArr);

  useEffect(() => {
    gsap.to('body', { css: { visibility: 'visible' } });

    // Animation on desktop only
    if (window.innerWidth >= 1024) {
      // Creates gallery poster based on the first item of the gallery
      setUpAndPositionPoster({ elementST: galleryArr, fnc: setGalleryArr });

      /*
       * This function is called every 8 seconds
       * Execute `posterExpansionAnimation` onComplete
       */

      loadingAnimation(
        { elementST: galleryArr, fnc: setGalleryArr },
        posterExpansionAnimation
      );
    } else {
      // Clear all animations on mobile
      gsap.set(['body', '.loading', '.poster'], { clearProps: 'all' });
    }

    // Update height and width on window resize
    const debouncedHandleResize = debounce(function handleResize() {
      setUpAndPositionPoster({ elementST: galleryArr, fnc: setGalleryArr });
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
            {galleryArr.map((poster, index) => poster)}
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
