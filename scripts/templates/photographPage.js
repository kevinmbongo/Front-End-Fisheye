export function photographerPage(data) {
  const { title, likes, video, image } = data;

  const isVideo = data.hasOwnProperty("video");

  const cardMediaSrc = isVideo
    ? `assets/videos/profilePages/videos/${video}`
    : `assets/images/profilePages/images/${image}`;

  function svgHeart() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
        <g clip-path="url(#clip0_120_572)">
          <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#911C1C"/>
        </g>
        <defs>
          <clipPath id="clip0_120_572">
            <rect width="21" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>`;
  }

  function getPageDOM() {
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

    const mediaTag = isVideo
      ? document.createElement("video")
      : document.createElement("img");

    mediaTag.setAttribute("alt", `${title}, closeup view`);
    mediaTag.setAttribute("aria-label", title);
    mediaTag.setAttribute("class", "picture");
    mediaTag.setAttribute("src", cardMediaSrc);
    mediaTag.setAttribute("tabindex", 0);

    const svgElement = document.createElement("div");
    svgElement.innerHTML = svgHeart();
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

  return { svgHeart, getPageDOM };
}
