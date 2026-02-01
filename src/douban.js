function makeAnchor() {
  const anchor = document.createElement('a');
  anchor.innerHTML = '&#9658;';
  anchor.setAttribute('style', 'margin-left: 10px;');
  anchor.target = '_blank';
  anchor.rel = 'noreferrer noopener';
  return anchor;
}

function addPlayMovieButton() {
  const movieName = window.document.title.slice(0, -5);
  const year = document.querySelector('#content .year');
  if (!year) return;

  const anchor = makeAnchor();
  anchor.href = 'https://www.iyf.tv/search/' + movieName;

  year.after(anchor);
}


function addPlayMusicButton() {
  const albumName = document.querySelector('#wrapper h1 span');
  if (!albumName) return;

  const anchor = makeAnchor();
  anchor.href = 'https://open.spotify.com/search/' + albumName.textContent + '/albums';

  albumName.after(anchor);
}

function addCopyBookHotkey() {
  const bookName = document.querySelector('#wrapper h1 span');
  if (!bookName) return;

  // bind a hotkey to copy the book name
  document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
      navigator.clipboard.writeText(bookName.textContent);
    }
  });
}

function addImdbLink() {
  const xpath = "//span[text()='IMDb:']";
  const matchingElement = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (matchingElement) {
    const imdbId = matchingElement.nextSibling.textContent.trim();
    matchingElement.nextSibling.remove();
    const imdbLink = document.createElement('a');
    imdbLink.innerText = imdbId;
    imdbLink.setAttribute('style', 'margin-left: 4px;');
    imdbLink.href = 'https://www.imdb.com/title/' + imdbId;
    imdbLink.target = '_blank';
    imdbLink.rel = 'noreferrer noopener';
    matchingElement.parentNode.insertBefore(
      imdbLink,
      matchingElement.nextSibling
    );
  }
}

if (window.location.host === 'movie.douban.com') {
  addPlayMovieButton();
  addImdbLink();
} else if (window.location.host === 'music.douban.com') {
  addPlayMusicButton();
} else if (window.location.host === 'book.douban.com') {
  addCopyBookHotkey();
}
