export class photographerCard {
  constructor(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    this.name = name;
    this.picture = `../../assets/images/portraits/${portrait}`;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.id = id;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${this.id}`);
    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", this.name);
    const h2 = document.createElement("h2");
    h2.textContent = this.name;
    const userInfos = document.createElement("div");
    const location = document.createElement("span");
    location.setAttribute("class", "location");
    location.textContent = `${this.city}/${this.country}`;
    const catchPhrase = document.createElement("span");
    catchPhrase.setAttribute("class", "catchPhrase");
    catchPhrase.textContent = this.tagline;
    const adr = document.createElement("span");
    adr.setAttribute("class", "adr");
    adr.textContent = `${this.price}€/jour`;

    article.appendChild(link);
    article.appendChild(userInfos);
    link.appendChild(img);
    link.appendChild(h2);
    userInfos.appendChild(location);
    userInfos.appendChild(catchPhrase);
    userInfos.appendChild(adr);
    return article;
  }
}
