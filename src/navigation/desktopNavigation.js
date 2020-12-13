import $ from "jquery";
import { countrySwiper } from "../..";
import { searchCountriesById } from "../countrySlider";

export const initDesktopNavigtion = () => {
  const $countries = $("ul.country-filter-desktop li");
  $countries.on("click", (event) => {
    $countries.removeClass("active");
    $(event.target).addClass("active");
    const id = $(event.target).data("id");
    searchCountriesById(id, countrySwiper);
  });
};
