function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/images/portraits/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const userInfos = document.createElement("div");
    const location = document.createElement("span");
    location.setAttribute("class", "location");
    location.textContent = `${city}/${country}`;
    const catchPhrase = document.createElement("span");
    catchPhrase.setAttribute("class", "catchPhrase");
    catchPhrase.textContent = tagline;
    const adr = document.createElement("span");
    adr.setAttribute("class", "adr");
    adr.textContent = `${price}€/jour`;
    article.appendChild(link);
    article.appendChild(userInfos);
    link.appendChild(img);
    link.appendChild(h2);
    userInfos.appendChild(location);
    userInfos.appendChild(catchPhrase);
    userInfos.appendChild(adr);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
