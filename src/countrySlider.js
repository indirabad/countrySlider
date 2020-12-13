import {
  Swiper,
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper";
import $ from "jquery";

import { CurrentScreen, isRetina, Resolutions } from "./const";
import "swiper/swiper-bundle.css";
import { hideAllTooltips } from "./tooltipSlider";
import { dataCountries } from "./data";

Swiper.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

const createSlide = (countryInfo) => {
  countryInfo;
  const swiperSlide = document.createElement("div");
  swiperSlide.className = "swiper-slide";
  swiperSlide.dataset.code = countryInfo.code;
  swiperSlide.dataset.city = countryInfo.city;
  const swiperImageContainer = document.createElement("div");
  swiperImageContainer.className = "swiper-slide-img";
  swiperImageContainer.style.backgroundImage = `url(${
    isRetina ? countryInfo.imgSrc2x ?? countryInfo.imgSrc : countryInfo.imgSrc
  })`;
  swiperSlide.appendChild(swiperImageContainer);
  const slideDescription = document.createElement("div");
  slideDescription.className = "swiper-slide-description";
  swiperImageContainer.appendChild(slideDescription);
  const cityWrapper = document.createElement("div");
  cityWrapper.className = "swiper-slide-description_city";
  cityWrapper.innerText = countryInfo.city;
  const countryWrapper = document.createElement("div");
  countryWrapper.className = "swiper-slide-description_country";
  countryWrapper.innerText = countryInfo.country;
  slideDescription.appendChild(cityWrapper);
  slideDescription.appendChild(countryWrapper);
  return swiperSlide;
};
export const swiperElements = dataCountries.map((item) => createSlide(item));
export const initCountrySldier = () => {
  let slidesPerView = getAvailableSlidesPerView();
  $("#countriesWrapper").append(swiperElements);

  let swiper = new Swiper(".swiper-container", {
    slidesPerView,
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  return swiper;
};

export const getAvailableSlidesPerView = () => {
  switch (CurrentScreen) {
    case Resolutions.highResolution:
      return 6;
    case Resolutions.desktop:
      return 5;
    case Resolutions.tablet:
      return 3;
    case Resolutions.mobile:
      return 3;
    case Resolutions.mobileMin:
      return 2;
    default:
      return 1;
  }
};

export const searchCountriesById = (id, swiper) => {
  hideAllTooltips();
  swiper.removeAllSlides();
  swiper.update();
  if (id === "all") {
    swiperElements.forEach((element) => {
      swiper.appendSlide(element);
    });
  } else {
    const slides = swiperElements.filter(
      (element) => element.dataset.code === id
    );
    slides.forEach((element) => {
      swiper.appendSlide(element);
    });
  }
  swiper.update();

  swiper.updateSlides();
};
