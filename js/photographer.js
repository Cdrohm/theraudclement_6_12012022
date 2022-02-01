//Photographers
//Loading content
import {
  getPhotographers
} from "./api.js";
import {
  getMedias
} from "./api.js";
import {
  enableBodyScroll,
  disableBodyScroll
} from "./body-scroll-lock.js";

async function init() {
  let photographers = await getPhotographers();
  const photographerId = parseInt(document.getElementById("photographer-id").value);
  const photographerItem = photographers.filter((item) => item.id === photographerId);
  const content = document.getElementById("artist");
  photographerItem.forEach((photographer) => content.appendChild(photographerHeader(photographer)));

  let medias = await getMedias();
  const photographer = photographers.find((photographer) => photographer.id === photographerId);
  let photographerMedias = medias.filter((item) => item.photographerId === photographerId);
  photographerMedias.forEach((media) => appendMediaToGallery(photographer, media));

  initLightbox();
  likesIncrement(photographerMedias);
  formModal(photographer);
  document.querySelector("#sort-by").addEventListener("change", () => {
      photographerMedias = sortBy(photographerMedias);
      const gallery = document.getElementById("media-section");
      gallery.innerHTML = "";
      likesArray.splice(0, likesArray.length);
      photographerMedias.forEach((media) => {
          appendMediaToGallery(photographer, media);
      });
      initLightbox();
      likesIncrement(photographerMedias);
  });
}

init();

//Photograph header card
function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article"); //profil
  const contactButton = document.getElementById("contact"); //contact
  const profilePicture = document.createElement("img"); //picture
  const photographerName = document.createElement("h2"); //name
  const localisation = document.createElement("p"); //localisation
  localisation.id = "localisation";
  const tagline = document.createElement("p"); //quote
  tagline.id = "tagline";

  profilePicture.src = "../photographersID/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  tagline.textContent = photographer.tagline;
  contactButton.textContent = "Contactez-moi";

  //add
  photographerProfile.appendChild(contactButton);
  photographerProfile.appendChild(profilePicture);
  photographerProfile.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);

  return photographerProfile;
}

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

//Likes
/**
* like + count
* @param {*} photographerMedias 
*/
function likesIncrement(photographerMedias) {
  const domLikesSum = document.querySelector(".popup-text span.number");

  photographerMedias.forEach((media) => {
      let mediaLikesTextContent = media.likes;
      likesArray.push(mediaLikesTextContent); //click +
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const likesSum = likesArray.reduce(reducer);
      domLikesSum.textContent = likesSum;
  });

  //load like by data
  const mediaLikes = document.querySelectorAll("#likes-number");

  for (let i = 0; i < mediaLikes.length; i++) {
      mediaLikes[i].addEventListener("click", () => {
          mediaLikes[i].textContent = parseInt(mediaLikes[i].textContent) + 1;
          domLikesSum.textContent = parseInt(domLikesSum.textContent) + 1;
      });
  }
}

//Dropdown menu phase 2 (ul)

/*function displayFilterMenu (displayMediaList) {
  const dropDownMenu = document.querySelector(".dropdownMenu");
  const filterSelect = document.querySelector(".filter-select");
  const filterSelectTrigger = document.querySelector(".filter-select_trigger");
  const filterOptions = document.querySelector(".filter-option");
  //first child select
  const firstFilterOption = document.querySelector(".filter-select a:first-child");
  //last child select
  const lastFilterOption = document.querySelector(".filter-select a:lasty-child");

  // filterOption array path onclick dropdown
  for(const filter of filterOptions) {
    filter.addEventListener("click", function(e)) {
      e.preventDefault (); // if filter no selected, selected take 1st child
      
    };
  } 
};*/

//Dropdown v3
//Sort by Pop/Date/title
/*
displayReorderList(); {
  let reorderAreaClosed = document.getElementById("sort-list_closed");
  let reorderAreaOpen = document.getElementById("sort-list");
  reorderAreaClosed.addEventListener("click", function (evt) {
    reorderAreaClosed.style.display = "none";
    reorderAreaOpen.style.display = "flex";
  });
  reorderAreaOpen.addEventListener("click", function (evt) {
    reorderAreaClosed.style.display = "flex";
    reorderAreaOpen.style.display = "none";
  });
}

listenForReordering(); {
  let elements = document.getElementsByClassName("sort-by");
  let reorderAreaFirst = document.getElementById("text-choice-change");
  for (let el of elements) {
    el.addEventListener("click", (e) => {
      let order = e.target.getAttribute("data-order");

      this.order = order;
      el.style.order == "0";

      this.reorder(order);
      reorderAreaFirst.textContent = e.target.textContent;
    });
  }
}

reorder(order); {
  let methodName = "reorderBy" + ucfirst(order);
  this[methodName]();
  this.build(this.all);
}
reorderByPopularity(); {
  this.all = this.all.sort((a, b) => {
    return b.likes - a.likes;
  });
}
reorderByDate() ;{
  this.all = this.all.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    return dateB - dateA;
  });
}
reorderByTitle(); {
  this.all = this.all.sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  });
}*/


//Dropdown menu - Sort-by
/**
* 
* @param {*} photographerMedias 
* @returns sort by pop/date/title
*/

function sortBy(photographerMedias) {
  const option = document.querySelector("#sort-by").value;
 //const select = document.querySelector(#sort);
 //option.style.display
 

  if (option == "popularity") {
    
      photographerMedias.sort(function(a, b) {
          return b.likes - a.likes;
      });
  } else if (option == "date") {
      photographerMedias.sort(function(a, b) {
          let dateA = new Date(a.date),
              dateB = new Date(b.date);
          return dateA - dateB;
      });
  } else if (option == "title") {
      photographerMedias.sort(function(a, b) {
          let titleA = a.title.toLowerCase(),
              titleB = b.title.toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
      });
  }

  return photographerMedias;
};

//test select display when selected
/*displayFilter (); {
if(document.querySelector('#sort-by option[value="popularity"]:checked')) {
  document.getElementById("#1").style.display = none;
  }
} */

//Form Modal
function formModal(photographer) {
  const photographerNameContent = document.querySelector("#form-modal div.form-text");
  const photographerName = document.createElement("span");
  photographerName.textContent = photographer.name;
  photographerNameContent.appendChild(photographerName);

  const formModalBg = document.querySelector("#form-modal.bground");
  const closeFormBtn = document.querySelector("#form-modal button.close");
  const formModalBtn = document.querySelector("#main-photographer #contact");

  const firstName = document.querySelector("#first");
  const lastName = document.querySelector("#last");
  const eMail = document.querySelector("#email");
  const message = document.querySelector("#message");

  const errorFirstName = document.querySelector("#missfirst");
  const errorLastName = document.querySelector("#misslast");
  const errorMail = document.querySelector("#missemail");
  const errorMessage = document.querySelector("#missmessage");

  const regex = /^[a-zA-Z\s]*$/; //lettres seulement

  //Modal event
  formModalBtn.onclick = () => {
      formModalBg.style.display = "block";
      document.getElementById("first").focus();
      disableBodyScroll(formModalBg);
  };

  formModalBg.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
          formModalBg.style.display = "none";
          enableBodyScroll(formModalBg);
      }
  });

  closeFormBtn.onclick = () => {
      formModalBg.style.display = "none";
      enableBodyScroll(formModalBg);
  };
}

//Form data
//Check firstName
function validateFirstName(firstName) {
  console.log (firstName.value.match(regex),regex.test(firstName));
  if (firstName.value.trim().length < 2 || first.value.trim() === '' || !firstName.value.match(regex)) {
      errorFirstName.style.display = "inline";
      errorFirstName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
      errorFirstName.style.color = "red";
      errorFirstName.style.fontSize = "0.8rem";
      errorFirstName.style.marginTop = "10px";
      firstName.style.border = "solid red 2px";
      return false;
  } else {
      errorFirstName.style.display = "none";
      firstName.style.border = "solid #279e7a 3px";
      return true;
  };
}

//Check lastName
function validateLastName(lastName) {
  if (lastName.value.toString().trim().length < 2 || first.value.trim() === '' || !lastName.value.match(regex)) {
      errorLastName.style.display = "inline";
      errorLastName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du Nom.";
      errorLastName.style.color = "red";
      errorLastName.style.fontSize = "0.8rem";
      errorLastName.style.marginTop = "10px";
      lastName.style.border = "solid red 2px";
      return false;
  } else {
      errorLastName.style.display = "none";
      lastName.style.border = "solid #279e7a 3px";
      return true;
  }
}

//Check email
function validateEmail(eMail) {
  if (!/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(eMail.value)) {
      errorMail.style.display = "inline"
      errorMail.innerText = "Veuillez entrer une adresse mail valide.";
      errorMail.style.color = "red";
      errorMail.style.fontSize = "0.8rem";
      errorMail.style.marginTop = "10px";
      eMail.style.border = "solid red 2px";
      return false;
  } else {
      errorMail.style.display = "none";
      eMail.style.border = "solid #279e7a 3px";
      return true;
  }
}

//Check message
function validateMessage(message) {
  if (message.value.toString().trim().length < 2 ) {
      errorLastName.style.display = "inline";
      errorLastName.innerText = "Veuillez rédiger votre message ici";
      errorLastName.style.color = "red";
      errorLastName.style.fontSize = "0.8rem";
      errorLastName.style.marginTop = "10px";
      lastName.style.border = "solid red 2px";
      return false;
  } else {
      errorLastName.style.display = "none";
      lastName.style.border = "solid #279e7a 3px";
      return true;
  }
}

//Validation form 
function validate() {
  //déclarer une variable
  let isFormValidate = [];

  isFormValidate.push(validateFirstName(firstName));
  isFormValidate.push(validateLastName(lastName));
  isFormValidate.push(validateEmail(eMail));
  isFormValidate.push(validateMessage(message));
  
  if (!isFormValidate.includes(false)) {
      form.style.display = "none";
      confirmationValidation.style.display = "flex";
  }
}

//Box photo
function initLightbox() {
  const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
  const gallery = links.map((link) => link.getAttribute("href"));
  links.forEach((link) =>
      link.addEventListener("click", (e) => {
          e.preventDefault();
          new LightboxFactory(e.currentTarget.getAttribute("href"), gallery);
      })
  );
}

class LightboxFactory {
  constructor(url, medias) {
      return new LightboxMedia(url, medias);
  }
}

class LightboxMedia {
  constructor(url, medias) {
      this.element = this.buildDOM(url);
      this.medias = medias;
      this.loadMedia(url);
      this.onKeyUp = this.onKeyUp.bind(this);
      document.body.appendChild(this.element);
      disableBodyScroll(this.element);
      document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  loadMedia(url) {
      const container = this.element.querySelector(".lightbox-container");
      container.innerHTML = "";

      const title = document.createElement("h2");
      title.innerHTML = this.getFormatedTitle(url);
      this.url = url;
      if (url.includes("jpg")) {
          const image = new Image();
          image.alt = this.getFormatedTitle(url);
          container.appendChild(image);
          image.src = url;
      } else if (url.includes("mp4")) {
          const video = document.createElement("video");
          video.setAttribute("aria-label", this.getFormatedTitle(url));
          container.appendChild(video);
          video.controls = true;
          video.src = url;
      }
      container.appendChild(title);
  }

  getFormatedTitle(path) {
      const splitedPath = path.split("/");
      const string = splitedPath[splitedPath.length - 1].split(".")[0];
      const formatedTitle = string.replaceAll("_", " ");
      return formatedTitle;
  }

  //accessibility
  onKeyUp(e) {
      if (e.key === "Escape") {
          this.close(e);
      } else if (e.key === "ArrowLeft") {
          this.prev(e);
      } else if (e.key === "ArrowRight") {
          this.next(e);
      }
  }

  //close
  close(e) {
      e.preventDefault();
      this.element.classList.add("fadeOut");
      enableBodyScroll(this.element);
      window.setTimeout(() => {
          this.element.parentElement.removeChild(this.element);
      }, 500);
      document.removeEventListener("keyup", this.onKeyUp);
  }

  //next
  next(e) {
      e.preventDefault();
      let i = this.medias.findIndex((media) => media === this.url);
      if (i === this.medias.length - 1) {
          i = -1;
      }
      this.loadMedia(this.medias[i + 1]);
  }

  //previous
  prev(e) {
      e.preventDefault();
      let i = this.medias.findIndex((media) => media === this.url);
      if (i === 0) {
          i = this.medias.length;
      }
      this.loadMedia(this.medias[i - 1]);
  }

  //incorp aria access + nav box
  buildDOM(url) {
      const dom = document.createElement("div");
      dom.classList.add("lightbox");
      dom.setAttribute("aria-modal", "true");
      dom.innerHTML = `<button class="close" aria-label="Close dialog"></button>
      <button class="next" aria-label="Next image"></button>
      <button class="prev" aria-label="Previous image"></button>
      <div class="lightbox-container" aria-label="image closeup view" role="dialog"></div>`;
      dom.querySelector(".close").addEventListener("click", this.close.bind(this));
      dom.querySelector(".next").addEventListener("click", this.next.bind(this));
      dom.querySelector(".prev").addEventListener("click", this.prev.bind(this));

      return dom;
  }
}