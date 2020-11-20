import { gsap } from '../gsapInit';

const loadingAnimation = (state, posterExpansionAnimation) => {
  // Loading timeline
  const loadingTL = gsap.timeline({ repeat: 2 });

  // Loading animation
  loadingTL
    .to('.loading', {
      delay: 3,
      duration: 5,
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
        posterExpansionAnimation(state); // Trigger `posterExpansionAnimation` `onComplete`
      },
    });
};

export default loadingAnimation;
