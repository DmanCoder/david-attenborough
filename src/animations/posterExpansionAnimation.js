import { gsap, CSSRulePlugin } from '../gsapInit';

import imgURL from './helpers/imgURL';
import moveFirstGalleryImageToEndOfGallery from './helpers/moveFirstGalleryImageToEndOfGallery';
import numberSlideAnimation from './numberSlideAnimation';
import progressBarAnimation from './progressBarAnimation';
import setUpAndPositionPoster from './setUpAndPositionPoster';
import bannerTextAnimation from './bannerTextAnimation';

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

  const gutter = 30;
  const startTime = 0.1;

  // Slide Gallery animation
  glItem.forEach((item, index) => {
    const posX = glFirstRect.width * index + gutter * index;
    switch (index) {
      case 0:
        gsap.to(item, {
          ease: 'power4.inOut',
          delay: startTime,
          duration: 1.2,
          x: 0,
        });
        break;
      case 1:
        gsap.to(item, {
          ease: 'power4.inOut',
          delay: startTime + 0.05,
          duration: 1.2,
          x: glFirstRect.width + gutter,
          top: 0,
        });
        break;
      default:
        gsap.to(item, {
          ease: 'power4.inOut',
          delay: startTime + 0.05,
          duration: 1.2,
          x: posX,
          top: 0,
        });
        break;
    }
  });

  numberSlideAnimation();
  progressBarAnimation(state);
  // const

  /*
   * 1). Expand Poster
   * 2). Fade out poster text
   * 3). Darken `posterAfter`
   * 4). Set current poster to body background image
   * 5). Clear props && Re-order positioning
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
        onStart: () => {
          const bannerTextTL = gsap.timeline();
          bannerTextTL
            .set('.banner__text', { css: { zIndex: 10 } })
            .to('.banner__text', {
              delay: 0.3,
              duration: 0.7,
              ease: 'power2.inOut',
              css: { scale: 1.2, left: '-6vw', bottom: '-3vw' },
            })
            .set('.banner__text', { clearProps: 'all' });

          setTimeout(() => {
            bannerTextAnimation();
          }, 750);
        },
        onComplete: () => {
          const btTl = gsap.timeline();
          btTl
            .set('.banner__text', {
              delay: 1,
              css: { zIndex: 50 },
            })
            .fromTo(
              [`.${subject} .text`],
              { y: 40, autoAlpha: 0 },
              {
                delay: 0.8,
                duration: 0.3,
                y: 0,
                stagger: 0.1,
                autoAlpha: 1,
              },
              0
            );
        },
      },
    })

    .to(
      '.dark-layer',
      {
        duration: 1.2,
        ease: 'power4.inOut',
        css: { backgroundColor: 'rgba(0,0,0,1)' },
      },
      0
    )
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
      borderRadius: '0',
      cssRule: { background: 'rgba(0, 0, 0, .3)' },
    })
    .to('body', { css: { background: bg } }, 'bg-switch')
    .set(['.poster', `.${subject} .banner__gallery-detail`], {
      clearProps: 'all',
      onComplete: () => {
        moveFirstGalleryImageToEndOfGallery();
        setUpAndPositionPoster();
      },
    });
};

export default posterExpansionAnimation;
