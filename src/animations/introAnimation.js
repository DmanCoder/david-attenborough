import { gsap } from '../gsapInit';
import loadingAnimation from './loadingAnimation';
import setUpAndPositionPoster from './setUpAndPositionPoster';

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

export default introRevealAnimation;
