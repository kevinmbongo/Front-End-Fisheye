function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  // close when click anywhere outside of the modal
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}

async function getModulePhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const reponse = await fetch("./data/photographers.json");

  let photographers = await reponse.json();

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers,
  };
}

function getCurrentPhotographerByIdModule(photographers, currentId) {
  const filteredphotographers = photographers.filter(
    (photographer) => photographer.id === currentId
  );

  return filteredphotographers;
}

async function displayDataModule(photographers) {
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);

  let idPage = searchParams.get("id");

  const currentPhotographer = getCurrentPhotographerByIdModule(
    photographers.photographers,
    parseInt(idPage)
  );
  console.log(currentPhotographer);
  const { name } = currentPhotographer[0];

  const modal = document.getElementById("contact_modal");
  const namePhotographer = document.getElementById("name_photographer");
  namePhotographer.textContent = name;

  // submit event
  const form = document.getElementById("form");
  const firstName = document.getElementById("firstName");
  const nameInput = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message_area");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(
      `firstName: ${firstName.value} name: ${nameInput.value} email: ${email.value} message: ${message.value}`
    );
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getModulePhotographers();
  displayDataModule(photographers);
}

init();

document
  .getElementById(".submit_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log("click");
  });
