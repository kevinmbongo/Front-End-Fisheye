export function someLikes(totalLikeSpan) {
  // incrémentation du total des likes
  function getTextContentArray(selector) {
    return Array.from(document.querySelectorAll(selector)).map(
      (element) => element.textContent
    );
  }

  function sumArray(array) {
    return array.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
  }
  const svg_heart = document.querySelectorAll(".svg_heart");

  svg_heart.forEach((heart) => {
    heart.addEventListener("click", () => {
      const likesArray = getTextContentArray(".likes_value");
      const newSumLike = sumArray(likesArray);
      if (totalLikeSpan.textContent !== newSumLike)
        totalLikeSpan.textContent = newSumLike;
    });
  });
}
