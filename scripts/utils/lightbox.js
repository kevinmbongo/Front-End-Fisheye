/**
 *@param {HTMLElement} element
 *@param {string[]} images chemins des images de la lightbox
 *@param {string} url image actuellement affiché
 */

export class Lightbox {
  // static init() {
  //   const links = Array.from(document.querySelectorAll(".test1"));

  //   const images = links.map((link) => link.getAttribute("href"));

  //   links.forEach((link) =>
  //     link.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       new Lightbox(e.currentTarget.getAttribute("href"), images);
  //     })
  //   );
  //   console.log(links);
  // }

  /**
   *@param {string} url url de l'image
   *@param {string[]} images chemins des images de la lightbox
   */

  constructor(url, images) {
    this.element = this.builDOM(url);
    this.images = images;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *@param {string} url url de l'image
   */
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }
  /**
   *@param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  /**
   * Ferme la lightbox
   *@param {MouseEvent| KeyboardEvent} e
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
   *@param {MouseEvent| KeyboardEvent} e
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
   *@param {MouseEvent| KeyboardEvent} e
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
   *@param {string} url url de l'image
   *@param {HTMLElement}
   */
  builDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<div class="lightbox"><button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class=""></div>
        <div class="lightbox_container">
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

/*
<div class="lightbox">
        <button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class=""></div>
        <div class="lightbox_container">
          <img
            src="./assets/images/profilePages/images/Animals_Rainbow.jpg "
            alt=""
          />
        </div>
      </div>
*/
// Lightbox.init();
