const closeModalBtn = document.getElementById("closeMyLightboxBtn");
const myLightbox = document.getElementById("myLightbox");

// Gérer l'ouverture de la MyLightbox
function showMyLightbox(currentSrc, myLightboxImg) {
  myLightbox.style.display = "block";
  myLightboxImg.setAttribute("src", currentSrc);
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
  const myLightboxImg = document.getElementById("myLightboxImg");
  const nextArrow = document.querySelector(".lightbox_next");
  const prevArrow = document.querySelector(".lightbox_prev");

  const medias = Array.from(openMyLightboxBtn);
  const src = medias.map((link) => link.getAttribute("src"));

  openMyLightboxBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const currentSrc = event.target.getAttribute("src");
      showMyLightbox(currentSrc, myLightboxImg);
    });
  });

  // Gérer les images suivantes
  nextArrow.addEventListener("click", function (event) {
    const currentSrcMyLightbox = myLightboxImg.getAttribute("src");
    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === src.length - 1) {
      i = -1;
    }
    showMyLightbox(src[i + 1], myLightboxImg);
  });

  prevArrow.addEventListener("click", function (event) {
    const currentSrcMyLightbox = myLightboxImg.getAttribute("src");
    let i = src.findIndex((dataSrc) => dataSrc === currentSrcMyLightbox);
    if (i === 0) {
      i = src.length;
    }
    showMyLightbox(src[i - 1], myLightboxImg);
  });
}

// /**
//    *@param {KeyboardEvent} e
//    */
//   onKeyUp(e) {
//     if (e.key === "Escape") {
//       this.close(e);
//     } else if (e.key === "ArrowLeft") {
//       this.prev(e);
//     } else if (e.key === "ArrowRight") {
//       this.next(e);
//     }
//   }
