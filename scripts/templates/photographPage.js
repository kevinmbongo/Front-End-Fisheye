function photographerPage(data) {
  const { title, date, likes, price, video, image } = data;

  function getPageDOM() {
    const articlePhoto = document.createElement("article");

    const titleImg = document.createElement("h3");
    titleImg.textContent = title;
    const dateImg = document.createElement("p");
    dateImg.textContent = date;
    const likesProfile = document.createElement("span");
    likesProfile.textContent = likes;
    const pricePhotographer = document.createElement("span");
    pricePhotographer.textContent = price;
    // const img = document.createElement("img");
    // img.setAttribute("src", image);
    // img.setAttribute("alt", title);

    articlePhoto.appendChild(titleImg);
    articlePhoto.appendChild(dateImg);
    articlePhoto.appendChild(likesProfile);
    articlePhoto.appendChild(pricePhotographer);

    return articlePhoto;
  }

  return { getPageDOM };
}
