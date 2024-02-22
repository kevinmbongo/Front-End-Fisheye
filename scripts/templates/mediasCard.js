export class mediasCard {
  constructor(data) {
    const { title, likes, video, image, id } = data;
    this.id = id;
    this.title = title;
    this.likes = likes;
    this.isVideo = data.hasOwnProperty("video");
    this.cardMediaSrc = this.isVideo
      ? `assets/videos/profilePages/videos/${video}`
      : `assets/images/profilePages/images/${image}`;
  }
  getArticleDOM() {
    const articlePhoto = document.createElement("article");
    const mediaContainer = document.createElement("a");
    const infoPicture = document.createElement("div");
    const likesContainer = document.createElement("div");
    likesContainer.setAttribute("class", "likes_container");

    const titleImg = document.createElement("span");
    titleImg.textContent = this.title;

    const likesArticle = document.createElement("span");
    likesArticle.setAttribute("class", "likes_value");
    likesArticle.setAttribute("tabindex", 0);
    likesArticle.textContent = this.likes;

    const mediaTag = this.isVideo
      ? document.createElement("video")
      : document.createElement("img");

    mediaTag.setAttribute("id", this.id);
    mediaTag.setAttribute("alt", `${this.title}, closeup view`);
    mediaTag.setAttribute("aria-label", this.title);
    mediaTag.setAttribute("class", "picture");
    mediaTag.setAttribute("src", this.cardMediaSrc);
    mediaTag.setAttribute("tabindex", 0);

    const svgElement = document.createElement("div");
    svgElement.innerHTML =
      '<i class="fa-solid fa-heart" style="color: #901c1c;"></i>';
    svgElement.setAttribute("class", "svg_heart");

    articlePhoto.appendChild(mediaContainer);
    mediaContainer.appendChild(mediaTag);
    mediaContainer.setAttribute("href", this.cardMediaSrc);
    mediaContainer.setAttribute("title", this.title);
    mediaContainer.setAttribute("id", `articleId${this.id}`);
    articlePhoto.setAttribute("class", "articleTest");
    articlePhoto.appendChild(infoPicture);
    infoPicture.appendChild(titleImg);
    infoPicture.appendChild(likesContainer);
    likesContainer.appendChild(likesArticle);
    likesContainer.appendChild(svgElement);
    svgElement.addEventListener("click", () => {
      const newLikes = this.likes + 1;
      likesArticle.textContent = newLikes;
    });
    return articlePhoto;
  }
}
