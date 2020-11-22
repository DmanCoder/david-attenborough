// 1px = 100vw / viewport's width (in px)
const convertPXToVW = (px) => {
  return px * (100 / document.documentElement.clientWidth);
};

export default convertPXToVW;
