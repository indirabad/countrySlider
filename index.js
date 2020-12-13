import "./public/assets/style/style.scss";
import { initCountrySldier } from "./src/countrySlider";
import { hideAllTooltips, initSliderTooltip } from "./src/tooltipSlider";
import { initMobileNavigation } from "./src/navigation/mobileNavigation";
import { initDesktopNavigtion } from "./src/navigation/desktopNavigation";
import { CurrentScreen, Resolutions } from "./src/const";

export const countrySwiper = initCountrySldier();

initMobileNavigation();
initDesktopNavigtion();
initSliderTooltip(countrySwiper);
countrySwiper.on("slideChange", function () {
  if (
    CurrentScreen !== Resolutions.desktop &&
    CurrentScreen !== Resolutions.highResolution
  ) {
    hideAllTooltips();
  }
});
