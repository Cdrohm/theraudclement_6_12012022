//Photograph gallery
let likesArray = [];

function appendMediaToGallery(photographer, media) {
  const gallery = document.getElementById("media-section");
  let medias = new MediaFactory(photographer, media);
  gallery.innerHTML += medias.createCard(photographer, media);
}

class MediaFactory {
  constructor(photographer, media) {
      if (media.image) {
          return new ImageMedia(photographer, media);
      } else if (media.video) {
          return new VideoMedia(photographer, media);
      }
  }
}

//constructor img
class ImageMedia {
  constructor(photographer, media) {
      this.name = photographer.name;
      this.image = media.image;
      this.alt = media.alt;
      this.title = media.title;
      this.likes = media.likes;
  }

  //getters?
  //decorater
  createCard() {
      return `
<article>
  <a href="../img/photos/${this.name}/${this.image}">
    <img id="media-image" alt="${this.alt}" src="../img/photos/${this.name}/${this.image}">
  </a>
  <div id="media-text">
    <h2>${this.title}</h2>
    <button type="button" id="likes-button">
      <p id="likes-number">${this.likes}</p>
      <img alt="likes" src="../img/logo/heart.png">
    </button>
  </div>
</article>
`;
  }
}

//video constructor
class VideoMedia {
  constructor(photographer, media) {
      this.name = photographer.name;
      this.video = media.video;
      this.alt = media.alt;
      this.title = media.title;
      this.likes = media.likes;
  }

  //decorater
  createCard() {
      return `
<article>
  <a href="../img/photos/${this.name}/${this.video}">
    <video id="media-video" controls="true" aria-label="${this.alt} + ", closeup view"" src="../img/photos/${this.name}/${this.video}">
  </a>
  <div id="media-text">
    <h2>${this.title}</h2>
    <button type="button" id="likes-button">
      <p id="likes-number">${this.likes}</p>
      <img alt="likes" src="../img/logo/heart.png">
    </button>
  </div>
</article>
`;
  }
}