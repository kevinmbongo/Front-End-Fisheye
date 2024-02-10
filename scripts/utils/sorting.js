export class sorting {
  constructor(currentMedias) {
    this.currentMedias = currentMedias;
    this.currentSort = document.getElementById("current_sort");
    this.optionContainer = document.getElementById("option_container");

    this.popular = document.getElementById("popular");
    this.date = document.getElementById("date");
    this.title = document.getElementById("title");
    this.popularSort();
    this.dateSort();
    this.titleSort();
    this.handleSelect();
    this.currentBtn();
  }

  sortByPopularity(currentMedias) {
    if (this.currentSort.value === "popular") {
      currentMedias.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }
  }

  sortByTitle(currentMedias) {
    if (this.currentSort.value === "title") {
      currentMedias.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    }
  }

  sortByDate(currentMedias) {
    if (this.currentSort.value === "date") {
      currentMedias.sort(function (a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });
    }
  }

  handleSelect() {
    this.currentSort.addEventListener("click", () => {
      this.optionContainer.style.display = "flex";
    });

    this.popular.addEventListener("click", () => {
      this.optionContainer.style.display = "none";
    });

    this.date.addEventListener("click", () => {
      this.optionContainer.style.display = "none";
    });

    this.title.addEventListener("click", () => {
      this.optionContainer.style.display = "none";
    });
  }

  currentBtn() {
    this.currentSort.querySelector("span").innerText = "Popularité";
    this.currentSort.setAttribute("value", "popular");
  }
  popularSort() {
    this.popular.addEventListener("click", () => {
      this.currentSort.querySelector("span").innerText = "Popularité";
      this.currentSort.setAttribute("value", "popular");
    });
  }
  dateSort() {
    this.date.addEventListener("click", () => {
      this.currentSort.querySelector("span").innerText = "Date";
      this.currentSort.setAttribute("value", "date");
    });
  }
  titleSort() {
    this.title.addEventListener("click", () => {
      this.currentSort.querySelector("span").innerText = "Titre";
      this.currentSort.setAttribute("value", "title");
    });
  }
}
