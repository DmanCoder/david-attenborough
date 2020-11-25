import { gsap, CSSRulePlugin } from '../gsapInit';

import imgURL from './helpers/imgURL';

const setUpAndPositionPoster = (state) => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  // Get rule
  const posterAfter = CSSRulePlugin.getRule('.poster::after');

  // Get the first index of the array
  const glFirst = glItem[0];
  const glLast = glItem[glItem.length - 1];
  //
  // Get x/y coordinates and width/height
  const glFirstRect = glFirst.getBoundingClientRect();

  //  Get data attribute
  const subject = glFirst.dataset.subject;
  const subjectLast = glLast.dataset.subject;

  // Create background string
  // const rgba = 'rgba(0, 0, 0, 0.3)';
  // const bgLinear = `linear-gradient(${rgba}, ${rgba})`;
  const bgURL = `url('${imgURL[subject]}') no-repeat center / cover`;
  const bgURLLast = `url('${imgURL[subjectLast]}') no-repeat center / cover`;

  console.log(bgURL)

  glItem.forEach((gallery, index) => {
    const gutter = 30 * index;
    if (index === 0) {
      gsap.set(gallery, {
        x: 0,
      });
    } else if (index === 1) {
      gsap.set(gallery, {
        x: glFirstRect.width + gutter,
      });
    } else {
      gsap.set(gallery, {
        x: glFirstRect.width * index + gutter,
      });
    }
  });

  // Position poster over above `glFirst`
  gsap.set('.poster', {
    css: {
      position: 'fixed',
      background: bgURL,
      top: glFirstRect.top + 1.08,
      left: glFirstRect.left,
    },
  });

  // Set background of `::after` to transparent
  gsap.set(posterAfter, {
    cssRule: { background: 'transparent' }, // Remove container mask
  });

  /* This section makes the `.poster` look like its the first item of the gallery */
  // Add `.shadow-none` to first item in the gallery array

  // Hide background
  if (window.init) {
    glFirst.classList.add('shadow-none');
    gsap.set(glFirst, {
      css: {
        background: 'transparent',
      },
    });
  } else {
    gsap.set(glFirst, {
      css: {
        background: bgURL,
      },
    });
  }

  // Add background
  gsap.set(glLast, { css: { background: bgURLLast } });

  // Rest layer
  gsap.set('.dark-layer', {
    css: { backgroundColor: 'rgba(0,0,0,0)' },
  });
};

export default setUpAndPositionPoster;
