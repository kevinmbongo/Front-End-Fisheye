import { photographerCard } from "../templates/photographerCard.js";
import { getPhotographers } from "../utils/getPhotographersJSON.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const data = photographer;
    const photograph = new photographerCard(data);
    const userCardDOM = photograph.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
