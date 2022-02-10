//Object Img by mediafactory
class Image {
  constructor(data) {
      this.id = data.id;
      this.photographerId = data.photographerId;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
      this.src = data.src;
      this.title = data.title;
      this.alt = data.alt;
  }

  //return html create
  render() {
      return `
    <figure>
     <img tabindex="0" src="img/photos/${this.photographerId}/${this.src}" alt="lancer le diaporama à partir de la photo de titre ${this.title}" class="diapo" id="${this.id}"/>
     <figcaption>
      <h2 class="mediaTitle">${this.title}</h2>
      <div> <span class="mediaLikes" data-id="${this.id}" >${this.likes}</span>
      <span> <i tabindex="0" class="heart fas fa-heart" data-id="${this.id}" ></i></span>
      </div>
     </figcaption>
    </figure>`;
  }

  renderSlide() {
      return `
    <figure >
     <img src="img/photos/${this.photographerId}/${this.src}" alt="${this.alt}" class="diapo" id="${this.id}" />
     <figcaption>
      <h2 class="mediaTitle">${this.title}</h2>
     </figcaption>
    </figure>`;
  }
}