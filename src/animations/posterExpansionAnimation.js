import { gsap, CSSRulePlugin } from '../gsapInit';

import imgURL from './helpers/imgURL';
import moveFirstGalleryImageToEndOfGallery from './helpers/moveFirstGalleryImageToEndOfGallery';

const posterExpansionAnimation = (state) => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  console.log(glItem, 'sdfasdfadf');

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

  const gutter = 30;
  glItem.forEach((item, index) => {
    if (index === 0) {
      gsap.to(item, { x: 0 });
    } else if (index === 1) {
      gsap.to(item, { x: glFirstRect.width + gutter });
    }
  });
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
        // duration: 1.2,
        duration: 3,
        ease: 'power4.inOut',
        // x: -(glFirstRect.width + 30),
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

          glFirst.parentNode.removeChild(glFirst);
          glLast.parentNode.appendChild(glFirst);

          // const el = [...state.elementST]; // E.g: From [8, 1, 2, 3, 4, 5, 6, 7]

          // console.log(el, 'BEFORE');
          // const firstPoster = el.shift();
          // el.push(firstPoster); // E.g: To [1, 2, 3, 4, 5, 6, 7, 8]
          // console.log(el, 'AFTER');

          // state.fnc(el);

          gsap.set(glFirst, { x: posX + spacing });
        },
      },
      0
    )
    .set(['.poster', `.${subject} .banner__gallery-detail`], {
      clearProps: 'all',
      onComplete: () => {
        // setUpAndPositionPoster();
        // moveFirstGalleryImageToEndOfGallery(state);
      },
    });
};

export default posterExpansionAnimation;
