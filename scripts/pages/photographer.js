//Mettre le code JavaScript lié à la page photographer.html
async function getPagePhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const reponse = await fetch("./data/photographers.json");

  let photographers = await reponse.json();

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers,
  };
}

function getMediaByPhotographerId(mediaArray, id) {
  const filteredMedia = mediaArray.filter(
    (media) => media.photographerId === id
  );

  return filteredMedia;
}

function getCurrentPhotographerById(photographers, currentId) {
  const filteredphotographers = photographers.filter(
    (photographer) => photographer.id === currentId
  );

  return filteredphotographers;
}

async function displayData(photographers) {
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);

  let idPage = searchParams.get("id");

  const currentPhotographer = getCurrentPhotographerById(
    photographers.photographers,
    parseInt(idPage)
  );
  console.log(currentPhotographer);
  const { name, portrait, city, country, tagline } = currentPhotographer[0];

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

  infoProfile.appendChild(photographerName);
  infoProfile.appendChild(photographerLocation);
  infoProfile.appendChild(photographerTagline);
  photoProfile.appendChild(photographerPortrait);

  const mediaFound = getMediaByPhotographerId(
    photographers.media,
    parseInt(idPage)
  );

  console.log(mediaFound);

  mediaFound.forEach((photographer) => {
    const photographerPageModel = photographerPage(photographer);
    const userCardDOM = photographerPageModel.getPageDOM();

    photographMain.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPagePhotographers();

  displayData(photographers);
}

init();
