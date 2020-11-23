import { gsap } from '../gsapInit';

const progressBarAnimation = (state) => {
  console.log('Progress Bar Animation...', state);

  switch (window.galleryIndex) {
    case 0:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '20%' },
      });
      break;
    case 1:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '40%' },
      });
      break;
    case 2:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '60%' },
      });
      break;
    case 3:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '80%' },
      });
      break;
    case 4:
      gsap.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { width: '100%' },
      });
      break;
    case 5:
      const tl = gsap.timeline();
      tl.to('.progress-bar div', {
        delay: 0.1,
        duration: 1.2,
        ease: 'power4.inOut',
        css: { left: '100%' },
        onComplete: () => gsap.set('.progress-bar div', { clearProps: 'all', }),
      });
      break;
    default:
      break;
  }

  window.galleryIndex += 1;
  const maxGalleryLength = 5;

  if (window.galleryIndex > maxGalleryLength) {
    window.galleryIndex = 0;
  }
};

export default progressBarAnimation;
