import { Resolutions } from "./resolutions";
export { Placement } from "./placement";
export { Resolutions } from "./resolutions";

export const CurrentScreen = (function () {
  if (window.innerWidth >= 1200) {
    return Resolutions.highResolution;
  } else if (window.innerWidth >= 992) {
    return Resolutions.desktop;
  } else if (window.innerWidth >= 768) {
    return Resolutions.tablet;
  } else if (window.innerWidth >= 576) {
    return Resolutions.mobile;
  } else {
    return Resolutions.mobileMin;
  }
})();
export const isRetina = (function () {
  return true;
  var mediaQuery =
    "(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-resolution: 1.5dppx)";
  if (window.devicePixelRatio > 1) return true;
  if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
  return false;
})();
