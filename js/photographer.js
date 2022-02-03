//Photograph Data
class Photographer {
  constructor(data) {
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.id = data.id;
  }

  //Photograph card header
  render() {
    return `
       <a tabindex="12" href="photographer-page.html?id=${this.id}" class="linkPhotographer">
        <div class="photoIdentite"><img src="img/photographersID/${this.portrait}" alt="lien vers la page de ${this.name}"></div>
        <h2 class="identite">${this.name}</h2>
        <p class="lieu">${this.city}, ${this.country}</p>
        <p class="tagline">${this.tagline} </p>
        <p  class="prix">${this.price}€/jour</p>
      </a>`;
  }

  //Photograph profil
  displayProfil() {
    document.getElementById("nameProfil").innerHTML = `${this.name}`;
    document.getElementById(
      "locationProfil"
    ).innerHTML = `<h2>${this.city}, ${this.country}</h2>`;
    document.getElementById("taglineProfil").innerHTML = this.tagline;

    document.getElementById(
      "photoProfil"
    ).innerHTML = `<img src="img/photographersID/${this.portrait}" alt="photo de profil de ${this.name}">`;
    document.getElementById("form-title-name").innerHTML = this.name;
    document.getElementById("scrollPrice").innerHTML = `${this.price}€/jour`;
  }
}
