const JSON_PATH = "./data/photographers.json";

async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  try {
    const repons = await fetch(JSON_PATH);

    const photographerArray = await repons.json();
    // et bien retourner le tableau photographers seulement une fois récupéré
    return { ...photographerArray };
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes:", error);
    throw error;
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
