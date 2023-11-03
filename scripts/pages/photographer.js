import { getPhotographers } from "../utils/functionTest.js";

import { photographerPage } from "../templates/photographPage.js";

import { initModal } from "../utils/contactForm.js";
import { setupMyLightbox } from "../utils/myLightbox.js";
import { mediaDisplays } from "../utils/sorting.js";

function svgBlackHeart() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 18" fill="none">
  <g clip-path="url(#clip0_120_618)">
    <path d="M11.125 21.35L9.85625 20.03C5.35 15.36 2.375 12.28 2.375 8.5C2.375 5.42 4.4925 3 7.1875 3C8.71 3 10.1712 3.81 11.125 5.09C12.0787 3.81 13.54 3 15.0625 3C17.7575 3 19.875 5.42 19.875 8.5C19.875 12.28 16.9 15.36 12.3938 20.04L11.125 21.35Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_120_618">
      <rect width="21" height="24" fill="white" transform="translate(0.625)"/>
    </clipPath>
  </defs>
</svg>`;
}

function getMediaByPhotographerId(mediaArray, id) {
  const filteredMedia = mediaArray.filter(
    (media) => media.photographerId === id
  );

  return filteredMedia;
}

function getCurrentPhotographerById(photographers, currentId) {
  const filteredPhotographers = photographers?.photographers.filter(
    (photographer) => photographer.id === currentId
  );

  return filteredPhotographers;
}

console.log();

async function displayData(photographers) {
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);

  let idPage = searchParams.get("id");
  const currentPhotographer = getCurrentPhotographerById(
    photographers,
    parseInt(idPage)
  );

  const { name, portrait, city, country, tagline, price } =
    currentPhotographer[0];

  const photographMain = document.querySelector(".photograph_article");
  const infoProfile = document.querySelector(".info_profile");
  const photoProfile = document.querySelector("#photo_profile");
  const photographerName = document.createElement("h2");
  photographerName.textContent = name;
  const photographerLocation = document.createElement("p");
  photographerLocation.textContent = `${city}/${country}`;
  const photographerTagline = document.createElement("span");
  photographerTagline.textContent = tagline;
  const photographerPortrait = document.createElement("img");
  photographerPortrait.setAttribute(
    "src",
    `assets/images/portraits/${portrait}`
  );
  photographerPortrait.setAttribute("alt", name);
  const sort = document.querySelector(".sort");
  const sortList = document.createElement("div");
  sortList.setAttribute("class", "sort_list");
  const mediaFound = getMediaByPhotographerId(
    photographers.media,
    parseInt(idPage)
  );

  const snackbar = document.querySelector(".snackbar");
  const svgHeart = document.createElement("div");
  svgHeart.innerHTML = svgBlackHeart();
  const likesContainer = document.createElement("div");
  likesContainer.setAttribute("class", "profile_likes_container");
  const likesProfile = document.createElement("span");

  const adr = document.createElement("span");
  adr.textContent = `${price}€ / jour`;
  const selectValue = document.getElementById("customSelect").value;

  infoProfile.appendChild(photographerName);
  infoProfile.appendChild(photographerLocation);
  infoProfile.appendChild(photographerTagline);
  photoProfile.appendChild(photographerPortrait);
  snackbar.appendChild(likesContainer);
  likesContainer.appendChild(likesProfile);
  likesContainer.appendChild(svgHeart);
  snackbar.appendChild(adr);

  let totalLikes = 0;

  function processPhotographerDisplay(mediaDisplays) {
    mediaDisplays.forEach((photographer) => {
      const photographerPageModel = photographerPage(photographer);
      const userCardDOM = photographerPageModel.getPageDOM();
      const span = userCardDOM.querySelector(".likes_value");
      const svgHeart = userCardDOM.querySelector(".svg_heart");

      const content = span.textContent;
      const contentNumber = parseFloat(content);
      // incrémentation du total des likes
      if (span) {
        if (!isNaN(contentNumber)) {
          totalLikes += contentNumber;
        }
      }

      let clicked = false;
      // function qui gere le click sur le coeur
      const clickHandler = () => {
        if (clicked) {
          return;
        }
        totalLikes += 1;
        likesProfile.textContent = totalLikes;
        clicked = true;
      };
      // mise à jour du total des likes au click
      svgHeart.addEventListener("click", clickHandler);

      photographMain.appendChild(userCardDOM);
    });
  }

  mediaDisplays(selectValue, processPhotographerDisplay, mediaFound);

  // Ajoute un gestionnaire d'événement au document pour détecter les clics
  document.addEventListener("change", function () {
    let selectValue = document.getElementById("customSelect").value;

    photographMain.innerHTML = "";
    mediaDisplays(selectValue, processPhotographerDisplay, mediaFound);
  });

  // Affichez la somme totale après la boucle

  likesProfile.textContent = totalLikes;
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
  initModal();
  setupMyLightbox();
}
document.addEventListener("DOMContentLoaded", init);
