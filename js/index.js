//Loading content
import {
  getPhotographers
} from "./api.js";

//initiate
async function init() {
  let photographers = await getPhotographers();
  const content = document.getElementById("main-index");
  photographers.forEach((photographer) =>
      content.appendChild(photographerNodeFactory(photographer, photographers))
  );
}

init();

//Photograph 
/**
* 
* @param {*} photographer 
* @param {*} photographers 
* @returns create photograph card index
*/
function photographerNodeFactory(photographer, photographers) {
  const photographerProfile = document.createElement("article");
  photographerProfile.id = "photographer-" + photographer.id;
  const urlPhotographer = document.createElement("a");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  localisation.id = "localisation";
  const tagline = document.createElement("p");
  tagline.id = "tagline";
  const price = document.createElement("p");
  price.id = "price";
  price.style.margin = "0 0 50px 0"; //margin bottom 

  urlPhotographer.href = "./html/photographer" + photographer.id + ".html"; //link to
  profilePicture.src = "./photographersID/" + photographer.portrait; //load img
  profilePicture.alt = photographer.name; //alt name on picture
  photographerName.textContent = photographer.name; //photograph name
  localisation.textContent = photographer.city + ", " + photographer.country; //localisation
  tagline.textContent = photographer.tagline; //citation
  price.textContent = photographer.price + "€/jour"; //price

  //create
  photographerProfile.appendChild(urlPhotographer);
  urlPhotographer.appendChild(profilePicture);
  urlPhotographer.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);
  photographerProfile.appendChild(price);

  return photographerProfile;
}