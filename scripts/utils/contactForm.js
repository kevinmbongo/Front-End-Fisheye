function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  // Ajout de la gestion de la touche "Escape" pour fermer la modal
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      console.log("close");
      closeModal();
    }
  });
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

  // error messages
  const errorMessage =
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";

  const emailMessage = "Veuillez entrer une adresse mail valide.";

  const currentPhotographer = getCurrentPhotographerByIdModule(
    photographers.photographers,
    parseInt(idPage)
  );
  const { name } = currentPhotographer[0];

  const openModal = document.getElementById("open_modal");
  openModal.addEventListener("click", () => displayModal());
  const hideModal = document.getElementById("close_modal");
  hideModal.addEventListener("click", () => closeModal());

  const namePhotographer = document.getElementById("name_photographer");
  namePhotographer.textContent = name;

  // check the validity of value
  function validInputValue(balise, message) {
    if (balise.value.length < 2) {
      balise.parentElement.setAttribute("data-error-visible", "true");
      balise.parentElement.setAttribute("data-error", message);
      balise.parentElement.setAttribute("class", "error");

      return false;
    } else {
      balise.parentElement.removeAttribute("data-error-visible");
      balise.parentElement.removeAttribute("data-error");
      balise.parentElement.removeAttribute("class");
      return true;
    }
  }

  // check email validity
  function validEmail(balise, message) {
    let emailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+/;
    if (emailRegExp.test(balise.value)) {
      balise.parentElement.removeAttribute("data-error-visible");
      balise.parentElement.removeAttribute("data-error");
      balise.parentElement.removeAttribute("class");
      return true;
    } else {
      balise.parentElement.setAttribute("data-error-visible", "true");
      balise.parentElement.setAttribute("data-error", message);
      balise.parentElement.setAttribute("class", "error");
      return false;
    }
  }

  // submit event
  const form = document.getElementById("form");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message_area");
  const submitbtn = document.querySelector(".submit_button");

  submitbtn.addEventListener("focus", () => {
    submitbtn.classList.add("focused");
  });

  submitbtn.addEventListener("blur", () => {
    submitbtn.classList.remove("focused");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      !validInputValue(firstName, errorMessage) ||
      !validInputValue(lastName, errorMessage) ||
      !validEmail(email, emailMessage) ||
      !validInputValue(message, errorMessage)
    ) {
      return false;
    } else {
      console.log(
        `firstName: ${firstName.value} name: ${lastName.value}; 
        email: ${email.value} message: ${message.value}`
      );
    }
  });

  // check validity on change event
  firstName.addEventListener("change", () => {
    validInputValue(firstName, errorMessage);
  });
  lastName.addEventListener("change", () => {
    validInputValue(lastName, errorMessage);
  });

  email.addEventListener("change", () => {
    validEmail(email, emailMessage);
  });
  message.addEventListener("change", () => {
    validInputValue(message, errorMessage);
  });
}

export async function initModal() {
  // Récupère les datas des photographes
  const { photographers } = await getModulePhotographers();
  displayDataModule(photographers);
}
