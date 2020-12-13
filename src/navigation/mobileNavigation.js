import $ from "jquery";
import { countrySwiper } from "../..";
import { searchCountriesById } from "../countrySlider";

export const initMobileNavigation = () => {
  const $countriesMenu = $("ul.country-filter-mobile");
  const $countries = $("ul.country-filter-mobile li");
  const $buttonMenu = $(".btn-filter-mobile");

  $buttonMenu.on("click", () => {
    $buttonMenu.toggleClass("active");
    if ($countriesMenu.css("display") === "block") {
      $countriesMenu.hide(500);
    } else {
      $countriesMenu.show(500);
    }
  });

  $countries.on("click", (event) => {
    $countries.removeClass("active");
    $(event.currentTarget).addClass("active");
    $countriesMenu.hide(500);
    const id = $(event.target).data("id");
    searchCountriesById(id, countrySwiper);
  });
};
