import { mediasCard } from "../templates/mediasCard.js";
import { getPhotographers } from "../utils/getPhotographersJSON.js";

const articleSection = document.querySelector(".photograph_article");
export function photographerProfile(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const likesContainer = document.createElement("div");
  likesContainer.setAttribute("class", "profile_likes_container");
  const adr = document.createElement("span");
  adr.textContent = `${price}€ / jour`;

  const snackbar = document.querySelector(".snackbar");
  snackbar.appendChild(likesContainer);
  snackbar.appendChild(adr);

  const infoProfile = document.querySelector(".info_profile");
  const photoProfile = document.querySelector("#photo_profile");
  const photographerName = document.createElement("h2");
  photographerName.textContent = name;
  const photographerLocation = document.createElement("p");
  photographerLocation.textContent = `${city}/${country} `;
  const photographerTagline = document.createElement("span");
  photographerTagline.textContent = `${tagline}`;
  const photographerPortrait = document.createElement("img");
  photographerPortrait.setAttribute(
    "src",
    `assets/images/portraits/${portrait}`
  );
  photographerPortrait.setAttribute("alt", name);

  infoProfile.appendChild(photographerName);
  infoProfile.appendChild(photographerLocation);
  infoProfile.appendChild(photographerTagline);
  photoProfile.appendChild(photographerPortrait);
}

function getPhotographerData(media, id) {
  const filteredPhotographer = media.filter(
    (photographer) => photographer.photographerId === parseInt(id)
  );

  return filteredPhotographer;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { media } = await getPhotographers();
  const params = new URLSearchParams(window.location.search);
  const idPage = params.get("id");
  const currentPhotographer = photographers.filter((photographer) => {
    return photographer.id === parseInt(idPage);
  });
  const currentMedias = getPhotographerData(media, idPage);
  console.log("media:", media);
  console.log("Current medias:", currentMedias);
  photographerProfile(currentPhotographer[0]);

  if (currentMedias) {
    currentMedias.forEach((item) => {
      console.log(item);
      articleSection.appendChild(mediasCard(item));
    });
  } else {
    console.error("myArray is undefined or not an array");
  }
}
init();
