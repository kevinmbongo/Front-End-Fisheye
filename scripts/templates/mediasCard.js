export function mediasCard(data) {
  const { title, likes, video, image } = data;
  const isVideo = data.hasOwnProperty("video");

  const cardMediaSrc = isVideo
    ? `assets/videos/profilePages/videos/${video}`
    : `assets/images/profilePages/images/${image}`;

  function getArticleDOM() {
    const articlePhoto = document.createElement("article");
    const infoPicture = document.createElement("div");
    const likesContainer = document.createElement("div");
    likesContainer.setAttribute("class", "likes_container");

    const titleImg = document.createElement("span");
    titleImg.textContent = title;

    const likesArticle = document.createElement("span");
    likesArticle.setAttribute("class", "likes_value");
    likesArticle.setAttribute("tabindex", 0);
    likesArticle.textContent = likes;

    const snackbar = document.querySelector(".snackbar");

    const mediaTag = isVideo
      ? document.createElement("video")
      : document.createElement("img");

    mediaTag.setAttribute("alt", `${title}, closeup view`);
    mediaTag.setAttribute("aria-label", title);
    mediaTag.setAttribute("class", "picture");
    mediaTag.setAttribute("src", cardMediaSrc);
    mediaTag.setAttribute("tabindex", 0);

    const svgElement = document.createElement("div");
    svgElement.innerHTML =
      '<i class="fa-solid fa-heart" style="color: #901c1c;"></i>';
    svgElement.setAttribute("class", "svg_heart");

    articlePhoto.appendChild(mediaTag);
    articlePhoto.setAttribute("class", "articleTest");
    articlePhoto.appendChild(infoPicture);
    infoPicture.appendChild(titleImg);
    infoPicture.appendChild(likesContainer);
    likesContainer.appendChild(likesArticle);
    likesContainer.appendChild(svgElement);
    svgElement.addEventListener("click", () => {
      const newLikes = likes + 1;
      likesArticle.textContent = newLikes;
    });

    return articlePhoto;
  }

  return getArticleDOM();
}
