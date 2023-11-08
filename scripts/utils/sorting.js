const sort = document.querySelector(".sort");
const sortBtn = document.createElement("button");
const optionContainer = document.createElement("div");
function selectArrow() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clip-path="url(#clip0_120_430)">
    <path d="M22.12 11.4531L16 17.5598L9.88 11.4531L8 13.3331L16 21.3331L24 13.3331L22.12 11.4531Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_120_430">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
}

sort.appendChild(sortBtn);
sortBtn.innerHTML = `<span id="currentText">Popularité</span>  ${selectArrow()}`;
sortBtn.setAttribute("class", "sortBtn");
sortBtn.setAttribute("id", "currentSort");
sortBtn.appendChild(optionContainer);
optionContainer.setAttribute("class", "optionContainer");
sortBtn.setAttribute("id", "currentSort");
const currentSort = document.getElementById("currentSort");
currentSort.setAttribute("value", "popular");

optionContainer.innerHTML = ` <button id=popularSort class="sortBtn" value="popular">Popularité  ${selectArrow()}</button>
<hr>
          <button id=dateSort class="sortBtn" value="date">Date</button>
          <hr>
          <button id=alphabetSort class="sortBtn" value="title">Titre</button>`;

let isOpen = false;
function openOptionContainer() {
  optionContainer.style.display = "flex";
  isOpen = true;
}

function closeOptionContainer() {
  optionContainer.style.display = "none";
  isOpen = false;
}

currentSort.addEventListener("click", function (event) {
  event.stopPropagation();
  if (isOpen) {
    closeOptionContainer();
  } else {
    openOptionContainer();
  }
});

// Attacher l'événement click à la fenêtre pour fermer le container si l'utilisateur clique à l'extérieur
window.addEventListener("click", function (event) {
  if (event.target !== optionContainer && isOpen) {
    closeOptionContainer();
  }
});

export function mediaDisplays(
  selectValue,
  processPhotographerDisplay,
  mediaFound
) {
  if (selectValue === "popular") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        return b.likes - a.likes;
      })
    );
  } else if (selectValue === "title") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      })
    );
  } else if (selectValue === "date") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      })
    );
  }
}
