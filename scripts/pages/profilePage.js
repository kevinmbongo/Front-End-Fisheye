import { getPhotographers } from "../utils/getPhotographersJSON.js";

export function photographerProfile(data) {
  const { name, portrait, city, country, tagline, price } = data;

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

function getPhotographerData(photographerData, id) {
  const filteredPhotographer = photographerData.filter(
    (photographer) => photographer.photographerId === id
  );

  return filteredPhotographer;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const params = new URLSearchParams(window.location.search);
  const idPage = params.get("id");
  const currentPhotographer = photographers.filter((photographer) => {
    return photographer.id === parseInt(idPage);
  });

  console.log("Current Photographer:", currentPhotographer[0]);
  photographerProfile(currentPhotographer[0]);
}
init();
