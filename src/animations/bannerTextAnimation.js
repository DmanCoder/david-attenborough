import { gsap } from '../gsapInit';

const bannerTextAnimation = () => {
  const bannerContent = gsap.utils.toArray('.banner__content');

  bannerContent.forEach((textContent, index) => {
    if (window.galleryIndex === index) {
      gsap.set(textContent, { autoAlpha: 1 });
    } else {
      gsap.set(textContent, { autoAlpha: 0 });
    }
  });
};

export default bannerTextAnimation;
