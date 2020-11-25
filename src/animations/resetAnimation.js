import { gsap } from '../gsapInit';
import bannerTextAnimation from './bannerTextAnimation';

const resetAnimation = () => {
  gsap.set(
    [
      '.background',
      '.loading',
      '.poster',
      '.background',
      '.intro-reveal',
      '.dark-layer',
    ],
    {
      clearProps: 'all',
    }
  );

  bannerTextAnimation();
};

export default resetAnimation;
