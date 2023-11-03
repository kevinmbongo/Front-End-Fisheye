export function mediaDisplays(
  selectValue,
  processPhotographerDisplay,
  mediaFound
) {
  if (selectValue === "popular") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        return b.likes - a.likes;
      })
    );
  } else if (selectValue === "title") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      })
    );
  } else if (selectValue === "date") {
    return processPhotographerDisplay(
      mediaFound.sort(function (a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      })
    );
  }
}
