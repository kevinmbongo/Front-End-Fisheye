const myLightbox = document.getElementById("myLightbox");
const closeModalBtn = document.getElementById("closeMyLightboxBtn");

// Gérer l'ouverture de la MyLightbox
function showMyLightbox(currentSrc, currentTitle) {
  myLightbox.style.display = "block";
  const fileExtension = currentSrc.split(".").pop();
  const myLightboxMedia = document.getElementById("myLightboxMedia");
  const lightboxTitle = document.getElementById("lightboxTitle");
  lightboxTitle.innerText = currentTitle.split(",")[0];
  // Supprimer le contenu précédent
  myLightboxMedia.innerHTML = "";
  myLightboxMedia.setAttribute("aria-label", currentTitle);
  if (fileExtension === "jpg") {
    const imgElement = document.createElement("img");
    imgElement.src = currentSrc;
    imgElement.setAttribute("alt", currentTitle);
    imgElement.setAttribute("id", "myLightboxImg");
    myLightboxMedia.appendChild(imgElement);
    console.log(currentSrc);
    console.log(currentTitle);
  } else if (fileExtension === "mp4") {
    const videoElement = document.createElement("video");
    videoElement.src = currentSrc;
    videoElement.setAttribute("alt", currentTitle);
    videoElement.setAttribute("controls", "true");
    videoElement.setAttribute("id", "myLightboxVideo");
    myLightboxMedia.appendChild(videoElement);
    console.log(currentSrc);
    console.log(currentTitle.split(",")[0]);
  }
}

// Gérer la fermeture de la MyLightbox
function hideMyLightbox() {
  myLightbox.style.display = "none";
}

closeModalBtn.addEventListener("click", hideMyLightbox);

// Fermer la MyLightbox si l'utilisateur clique en dehors de la MyLightbox
window.addEventListener("click", function (event) {
  if (event.target === myLightbox) {
    hideMyLightbox();
  }
});

// Fonction pour gérer la MyLightbox

export function setupMyLightbox() {
  // Récupérer les éléments HTML
  const openMyLightboxBtns = document.querySelectorAll(".picture");
  const nextArrow = document.querySelector(".lightbox_next");
  const prevArrow = document.querySelector(".lightbox_prev");
  const closeLightboxBtn = document.querySelector(".lightbox_close");

  const medias = Array.from(openMyLightboxBtns);
  const src = medias.map((link) => link.getAttribute("src"));
  const alt = medias.map((link) => link.getAttribute("alt"));

  // Fonction pour ajouter la classe "focused"
  const handleFocus = (item) => {
    item.classList.add("focused");
  };

  // Fonction pour supprimer la classe "focused"
  const handleBlur = (item) => {
    item.classList.remove("focused");
  };

  // Ajouter les écouteurs d'événements

  // Fonction pour gérer l'événement "Enter" sur le bouton d'ouverture
  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleOpenButtonClick(event);
    }
  }

  // Fonction pour gérer l'ouverture de la lightbox
  function handleOpenButtonClick(event) {
    const currentSrc = event.target.getAttribute("src");
    const currentTitle = event.target.getAttribute("alt");
    showMyLightbox(currentSrc, currentTitle);
  }

  // Ajouter les écouteurs d'événements pour chaque bouton d'ouverture
  openMyLightboxBtns.forEach((btn) => {
    btn.addEventListener("keydown", handleEnterKey);
    btn.addEventListener("click", handleOpenButtonClick);
  });

  // Ajouter les écouteurs d'événements pour les flèches de navigation
  nextArrow.addEventListener("click", nextImage);
  nextArrow.addEventListener("focus", () => {
    nextArrow.classList.add("focusedNext");
  });
  nextArrow.addEventListener("blur", () => {
    nextArrow.classList.remove("focusedNext");
  });
  prevArrow.addEventListener("click", prevImage);
  // prevArrow.addEventListener("focus", handleFocus);
  // prevArrow.addEventListener("blur", handleBlur);

  // Ajouter l'écouteur d'événements pour les touches clavier
  document.addEventListener("keydown", handleKeyboardEvents);

  function nextImage() {
    const currentSrcMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("src");

    const currentTitleMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("alt");

    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === src.length - 1) {
      i = -1;
    }

    let altIndex = alt.findIndex(
      (dataAlt) => dataAlt === currentTitleMyLightbox
    );
    if (altIndex === alt.length - 1) {
      altIndex = -1;
    }

    showMyLightbox(src[i + 1], alt[altIndex + 1]);
  }
  function prevImage() {
    const currentSrcMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("src");

    const currentTitleMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("alt");

    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === 0) {
      i = src.length;
    }

    let altIndex = alt.findIndex(
      (dataAlt) => dataAlt === currentTitleMyLightbox
    );
    if (altIndex === 0) {
      altIndex = alt.length;
    }

    showMyLightbox(src[i - 1], alt[altIndex - 1]);
  }

  function handleKeyboardEvents(event) {
    switch (event.key) {
      case "Escape":
        hideMyLightbox();
        break;
      case "ArrowRight":
        // Passage à l'image suivante
        nextImage();
        break;
      case "ArrowLeft":
        // Passage à l'image précédente
        prevImage();
        break;
      default:
        break;
    }
  }

  // Gérer les images suivantes
  nextArrow.addEventListener("click", nextImage);

  prevArrow.addEventListener("click", prevImage);
  document.addEventListener("keydown", handleKeyboardEvents);
}
