const moveFirstGalleryImageToEndOfGallery = (state) => {
  // Copy of state
  //   const el = [...state.elementST]; // E.g: From [8, 1, 2, 3, 4, 5, 6, 7]
  //   const firstPoster = el.shift();
  //   el.push(firstPoster); // E.g: To [1, 2, 3, 4, 5, 6, 7, 8]
  /*
   * When state change is triggered it causes a re-render that re-triggers
   * All the animation functions, causing an endless loop that works well with the animations
   * - As planed - :D
   */
  //   state.fnc(el);
  // gsap.set('.poster', { color: 'red' });
};

export default moveFirstGalleryImageToEndOfGallery;
