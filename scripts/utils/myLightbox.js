const myLightbox = document.getElementById("myLightbox");
const closeModalBtn = document.getElementById("closeMyLightboxBtn");

// Gérer l'ouverture de la MyLightbox
function showMyLightbox(currentSrc) {
  myLightbox.style.display = "block";
  const fileExtension = currentSrc.split(".").pop();
  const myLightboxMedia = document.getElementById("myLightboxMedia");

  // Supprimer le contenu précédent
  myLightboxMedia.innerHTML = "";

  if (fileExtension === "jpg") {
    const imgElement = document.createElement("img");
    imgElement.src = currentSrc;
    imgElement.setAttribute("id", "myLightboxImg");
    myLightboxMedia.appendChild(imgElement);
  } else if (fileExtension === "mp4") {
    const videoElement = document.createElement("video");
    videoElement.src = currentSrc;
    videoElement.setAttribute("controls", "true");
    videoElement.setAttribute("id", "myLightboxVideo");
    myLightboxMedia.appendChild(videoElement);
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
  const openMyLightboxBtn = document.querySelectorAll(".picture");
  const myLightboxMedia = document.getElementById("myLightboxMedia");
  const nextArrow = document.querySelector(".lightbox_next");
  const prevArrow = document.querySelector(".lightbox_prev");

  const medias = Array.from(openMyLightboxBtn);
  const src = medias.map((link) => link.getAttribute("src"));

  openMyLightboxBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const currentSrc = event.target.getAttribute("src");
      showMyLightbox(currentSrc);
    });
  });

  // Gérer les images suivantes
  nextArrow.addEventListener("click", function (event) {
    const currentSrcMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("src");
    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === src.length - 1) {
      i = -1;
    }
    showMyLightbox(src[i + 1]);
  });

  prevArrow.addEventListener("click", function (event) {
    const currentSrcMyLightbox = document
      .getElementById("myLightboxMedia")
      .querySelector("img, video")
      .getAttribute("src");
    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === 0) {
      i = src.length;
    }
    showMyLightbox(src[i - 1]);
  });
}
