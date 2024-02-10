/**
 * @property {HTMLElement} element
 * * @param {string[]} chemins des images de la lightbox
 * * @param {string} image courante affichée
 */
export class lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(`a[href$=".jpg"], a[href$=".mp4"]`)
    );
    const images = links.map((link) => link.getAttribute("href"));
    links.forEach((link) =>
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          console.log(e.currentTarget.getAttribute("href"));
          new lightbox(e.currentTarget.getAttribute("href"), images);
        }
      })
    );
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new lightbox(e.currentTarget.getAttribute("href"), images);
      })
    );
  }

  /**
   * @param {string} URL de l'image
   * @param {string[]} chemins des images de la lightbox
   */
  constructor(url, images) {
    // Création de l'élément DOM

    this.element = this.buildDOM(url);
    this.images = images;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {string} URL de l'image
   */
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const video = document.createElement("video");
    video.setAttribute("controls", "true");
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);

    if (url.includes(".mp4")) {
      video.src = url;

      video.onloadeddata = () => {
        container.removeChild(loader);
        container.appendChild(video);
        this.url = url;
      };
    } else {
      image.src = url;

      image.onload = () => {
        container.removeChild(loader);
        container.appendChild(image);
        this.url = url;
      };
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "Enter") {
      this.next(e);
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  /**
   * @param {string} URL de l'image
   */
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.setAttribute("id", "myLightbox");
    dom.setAttribute("role", "dialog");
    dom.setAttribute("aria-labelledby", "lightboxTitle");
    dom.setAttribute("aria-modal", "true");
    dom.innerHTML = `<button
          class="lightbox_close"
          id="closeMyLightboxBtn"
          aria-label="Close dialog"
        ></button>
        <button class="lightbox_next" aria-label="Next image"></button>
        <button class="lightbox_prev" aria-label="Previous image"></button>
        <span class="lightbox_title" id="lightboxTitle" role="heading"></span>

        <div class="lightbox_container" id="myLightboxMedia">
        </div>`;

    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));

    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));

    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));

    return dom;
  }
}
