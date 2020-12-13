import $ from "jquery";
import { CurrentScreen, isRetina, Placement, Resolutions } from "./const";
import { dataCountries } from "./data";

const $swiperContainer = $(".swiper-container");
const calculatePlacement = (elementIndex, slideIndex, slidesPerView, count) => {
  const indexTop = elementIndex - slideIndex;
  const indexBottom = elementIndex - Math.round(count / 2) - slideIndex;
  if (slidesPerView === 2 || CurrentScreen === Resolutions.mobile) {
    return Placement.center;
  }
  if (slidesPerView === 3) {
    return elementIndex >= count / 2 ? Placement.bottom : Placement.top;
  } else if (
    (slidesPerView - indexTop <= 2 && slidesPerView - indexTop >= 0) ||
    (slidesPerView - indexBottom <= 2 && slidesPerView - indexBottom >= 0)
  ) {
    return Placement.left;
  } else {
    return Placement.right;
  }
};

export const hideAllTooltips = () => {
  $(".country-tooltip").hide(300, function () {
    $(this).remove();
  });
};

export const initSliderTooltip = (swiper) => {
  const slides = $(".swiper-slide-img")
    .off("mouseover")
    .off("mouseleave")
    .off("click");

  switch (CurrentScreen) {
    case Resolutions.desktop:
    case Resolutions.highResolution:
      slides
        .on("mouseover", (event) => {
          showTooltip(swiper, event.currentTarget);
        })
        .on("mouseleave", (event) => {
          hideAllTooltips();
        });
      break;
    default:
      slides.on("click", (event) => {
        showTooltip(swiper, event.currentTarget);
      });
      $(document).on("scroll", () => {
        hideAllTooltips();
      });
      break;
  }
};

const createTooltip = (element) => {
  const countryInfo = dataCountries.find(
    (item) =>
      item.city === element.parentElement.dataset.city &&
      item.code === element.parentElement.dataset.code
  );
  const tooltip = document.createElement("div");

  tooltip.className = "country-tooltip";
  const content = document.createElement("div");
  content.className = "modal-content";
  const btnClose = document.createElement("button");
  btnClose.className = "close";
  btnClose.innerHTML = "x";
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const divText = document.createElement("div");
  const p = document.createElement("p");
  const a = document.createElement("a");
  divText.className = "modal-text";
  divImg.className = "modal-img";
  const descrpWrapper = document.createElement("div");
  const cityWrapper = document.createElement("div");
  descrpWrapper.className = "description-wrapper";
  cityWrapper.innerText = countryInfo.city;
  const countryWrapper = document.createElement("div");
  countryWrapper.innerText = countryInfo.country;
  divImg.appendChild(descrpWrapper);
  descrpWrapper.appendChild(cityWrapper);
  descrpWrapper.appendChild(countryWrapper);

  a.className = "btn btn-primary";
  a.innerText = "Подробнее";
  p.innerText = countryInfo.description;
  img.src = isRetina
    ? countryInfo.imgSrc2x ?? countryInfo.imgSrc
    : countryInfo.imgSrc;
  content.appendChild(btnClose);
  content.appendChild(divImg);
  divImg.appendChild(img);
  content.appendChild(divText);
  divText.appendChild(p);
  divText.appendChild(a);
  $(btnClose).on("click", () => {
    $(tooltip).hide(500, () => {
      $(tooltip).remove();
    });
  });
  tooltip.appendChild(content);
  return tooltip;
};
const showTooltip = (swiper, element) => {
  $(element).removeClass("left-placement").removeClass("bottom-placement");
  const width = element.offsetWidth;
  const elementIndex = $(".swiper-slide").index(element.parentElement);

  const placement = calculatePlacement(
    elementIndex,
    swiper.activeIndex,
    swiper.params.slidesPerView,
    swiper.slides.length
  );
  hideAllTooltips();
  //show tooltip
  const tooltip = createTooltip(element);

  switch (placement) {
    case Placement.right:
      $(element).append($(tooltip));
      $(tooltip).css("left", width).css("top", 0);
      break;
    case Placement.left:
      $(element).append($(tooltip));
      $(tooltip).css("left", -400).css("top", 0);
      $(element).addClass("left-placement");
      break;
    case Placement.top:
      $(tooltip)
        .css("left", 0)
        .css("top", "17px")
        .width("auto")
        .height("318px")
        .css("margin", "0 10px");
      $swiperContainer.append(tooltip);
      $(tooltip).show(300);
      break;
    case Placement.bottom:
      $(tooltip)
        .css("left", 0)
        .css("bottom", 30)
        .css("top", "auto")
        .width("auto")
        .height("317px")
        .css("margin", "0 10px");
      $swiperContainer.append(tooltip);
      $(tooltip).show(300);
      break;
    default:
      $(tooltip)
        .css("left", 0)
        .css("bottom", "0")
        .css("top", 28)
        .width("auto")
        .height("482px")
        .css("margin", "0 15px");
      $swiperContainer.append(tooltip);
      $(tooltip).show(300);
      break;
  }
  $(tooltip).show();
};
