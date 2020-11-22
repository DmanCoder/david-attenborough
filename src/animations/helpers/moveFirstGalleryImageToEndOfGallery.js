import { gsap } from '../../gsapInit';

const moveFirstGalleryImageToEndOfGallery = (state) => {
  const glItem = gsap.utils.toArray('.banner__gallery-item');

  const glLength = glItem.length - 1;

  // Get the first index of the array
  const glFirst = glItem[0];

  // Get the last index of the array
  const glLast = glItem[glLength];

  // Get x/y coordinates and width/height
  const glLastRect = glLast.getBoundingClientRect();

  const marginLeftSpacing = 30;
  const spacing = glLength * marginLeftSpacing;
  const posX = glLastRect.width * glLength;

  glFirst.parentNode.removeChild(glFirst);
  
  glFirst.classList.remove('shadow-none');

  glLast.parentNode.appendChild(glFirst);

  gsap.set(glFirst, { x: posX + spacing });
};

export default moveFirstGalleryImageToEndOfGallery;
