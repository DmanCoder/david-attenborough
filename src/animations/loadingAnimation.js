import { gsap } from '../gsapInit';
import posterExpansionAnimation from './posterExpansionAnimation';

const loadingAnimation = () => {
  // Loading timeline
  const loadingTL = gsap.timeline({ repeat: -1 });

  // Loading animation
  loadingTL
    .to('.loading', {
      delay: 1,
      duration: 3.5,
      css: {
        left: '0',
      },
    })
    .to('.loading', {
      duration: 0.5,
      css: { left: '100%' },
    })
    .set('.loading', {
      clearProps: 'all',
      onComplete: () => {
        posterExpansionAnimation(); // Trigger `posterExpansionAnimation` `onComplete`
      },
    });
};

export default loadingAnimation;
