import { gsap, CSSRulePlugin } from '../gsapInit';

import imgURL from './helpers/imgURL';

const setUpAndPositionPoster = (state) => {
  // Collect image gallery to array
  const glItem = gsap.utils.toArray('.banner__gallery-item');
  const galleryContainer = gsap.utils.toArray('.banner__gallery')[0];

  // Get rule
  const posterAfter = CSSRulePlugin.getRule('.poster::after');

  // Get the first index of the array
  const glFirst = glItem[0];
  const glLast = glItem[glItem.length - 1];
  //
  // Get x/y coordinates and width/height
  const glFirstRect = glFirst.getBoundingClientRect();
  const galleryContainerRect = galleryContainer.getBoundingClientRect();

  //  Get data attribute
  const subject = glFirst.dataset.subject;
  const subjectLast = glLast.dataset.subject;

  // Create background string
  // const rgba = 'rgba(0, 0, 0, 0.3)';
  // const bgLinear = `linear-gradient(${rgba}, ${rgba})`;
  const bgURL = `url('${imgURL[subject]}') no-repeat center / cover`;
  const bgURLLast = `url('${imgURL[subjectLast]}') no-repeat center / cover`;

  glItem.forEach((gallery, index) => {
    const gutter = 30 * index;
    if (index === 0) return;
    if (index === 1) {
      gsap.to(gallery, {
        x: glFirstRect.width + gutter,
      });
    } else {
      gsap.to(gallery, {
        x: glFirstRect.width * index + gutter,
      });
    }
  });

  // Position poster over above `glFirst`
  gsap.set('.poster', {
    css: {
      background: bgURL,
      top: glFirstRect.top + 1,
      left: glFirstRect.left,
      width: glFirstRect.width,
      height: glFirstRect.height,
      borderRadius: '2rem',
      zIndex: '10',
    },
  });

  // Set background of `::after` to transparent
  gsap.set(posterAfter, {
    cssRule: { background: 'transparent' }, // Remove container mask
  });

  /* This section makes the `.poster` look like its the first item of the gallery */
  // Add `.shadow-none` to first item in the gallery array
  glFirst.classList.add('shadow-none');

  // Hide background
  gsap.to(glFirst, { background: 'transparent' });
  gsap.set(glLast, { css: { background: bgURLLast } });
};

export default setUpAndPositionPoster;
