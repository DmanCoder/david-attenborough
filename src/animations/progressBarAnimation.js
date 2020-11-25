import { gsap } from '../gsapInit';

const progressBarAnimation = (state) => {
  console.log('Progress Bar Animation...', state);

  switch (window.galleryIndex) {
    case 0:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '14.5%' },
      });
      break;
    case 1:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '29%' },
      });
      break;
    case 2:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '43.5%' },
      });
      break;
    case 3:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '58%' },
      });
      break;
    case 4:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '72.5%' },
      });
      break;
    case 5:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '90%' },
      });
      break;
    case 6:
      const tl = gsap.timeline();
      tl.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '100%' },
        onComplete: () => gsap.set('.progress-bar div', { clearProps: 'all' }),
      });
      break;
    default:
      break;
  }

  window.galleryIndex += 1;
  const maxGalleryLength = 6;

  if (window.galleryIndex > maxGalleryLength) {
    window.galleryIndex = 0;
  }
};

export default progressBarAnimation;
