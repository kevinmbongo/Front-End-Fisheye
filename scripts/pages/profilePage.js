import { mediasCard } from "../templates/mediasCard.js";
import { contactFormModal } from "../utils/contactFormModal.js";
import { getPhotographers } from "../utils/getPhotographersJSON.js";
import { lightbox } from "../utils/lightbox.js";
import { sorting } from "../utils/sorting.js";

const articleSection = document.querySelector(".photograph_article");
let totalLikes = 0;
const totalLikeSpan = document.createElement("span");

export function photographerProfile(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const likesContainer = document.createElement("div");
  likesContainer.setAttribute("class", "profile_likes_container");

  const svgElement = document.createElement("div");
  svgElement.innerHTML = '<i class="fa-solid fa-heart"></i>';

  const adr = document.createElement("span");
  adr.textContent = `${price}€ / jour`;
  likesContainer.appendChild(totalLikeSpan);
  likesContainer.appendChild(svgElement);

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

  const contactForm = new contactFormModal();
  contactForm.initContactForm(name);
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

  photographerProfile(currentPhotographer[0]);
  const sortingInstance = new sorting(currentMedias);
  const currentSort = document.getElementById("current_sort");
  const popularSort = document.getElementById("popular");
  const dateSort = document.getElementById("date");
  const titleSort = document.getElementById("title");

  function createArticles(item) {
    const data = item;
    const mediaCard = new mediasCard(data);
    const articleDOM = mediaCard.getArticleDOM();
    articleSection.appendChild(articleDOM);
  }

  popularSort.addEventListener("click", () => {
    sortingInstance.sortByPopularity(currentMedias);
    articleSection.innerHTML = "";

    if (currentMedias) {
      currentMedias.forEach((item) => {
        createArticles(item);
      });
      lightbox.init();
    } else {
      console.error("myArray is undefined or not an array");
    }
  });

  titleSort.addEventListener("click", () => {
    sortingInstance.sortByTitle(currentMedias);
    articleSection.innerHTML = "";

    if (currentMedias) {
      currentMedias.forEach((item) => {
        createArticles(item);
      });
      lightbox.init();
    } else {
      console.error("myArray is undefined or not an array");
    }
  });

  dateSort.addEventListener("click", () => {
    sortingInstance.sortByDate(currentMedias);
    articleSection.innerHTML = "";
    console.log(currentMedias);
    if (currentMedias) {
      currentMedias.forEach((item) => {
        createArticles(item);
      });
      lightbox.init();
    } else {
      console.error("myArray is undefined or not an array");
    }
  });
  // Première initialisation de currentMedias trié par popularité
  sortingInstance.sortByPopularity(currentMedias);

  if (currentMedias) {
    currentMedias.forEach((item) => {
      createArticles(item);
      // const currentId = articleDOM.querySelector("a").id;
      // const currentSrc = articleDOM
      //   .querySelector("a .picture")
      //   .getAttribute("src");
      // const svgElements = document.querySelectorAll(".svg_heart");
      // const likesArticle = document.querySelector(".likes_value");

      // const currentTitle = articleDOM.querySelector("div span").textContent;

      // incrémentation du total des likes

      if (!isNaN(item.likes)) {
        totalLikes += item.likes;
      }

      totalLikeSpan.textContent = totalLikes;
    });
    lightbox.init();
  } else {
    console.error("myArray is undefined or not an array");
  }
}

init();
