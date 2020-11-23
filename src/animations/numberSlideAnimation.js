import { gsap } from '../gsapInit';

const numberSlideAnimation = () => {
  // Loading timeline
  const numberSlideTL = gsap.timeline();

  const numberSpan = gsap.utils.toArray('.progress-number span');
  console.log(window.galleryIndex);
  switch (window.galleryIndex) {
    case 0:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-6.45vw' },
      });
      break;
    case 1:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-12.9vw' },
      });
      break;
    case 2:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-19.35vw' },
      });
      break;
    case 3:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-25.8vw' },
      });
      break;
    case 4:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-32.25vw' },
      });
      break;
    case 5:
      gsap.to(numberSpan, {
        delay: 0.01,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '-38.7vw' },
        onComplete: () => gsap.set(numberSpan, { clearProps: 'all' }),
      });
      break;
    default:
      break;
  }
};

export default numberSlideAnimation;
