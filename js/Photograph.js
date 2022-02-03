//Photograph data
class Photographer {
    constructor(data) {
    this.name = data.name;
    this.city= data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.id = data.id;
    }

    //Load profil on photographer page
    return `
        <a tabindex="15" href="photographer.html?id=${this.id}" class="">
        <div class = "portrait"> <img src = "img/photographersID/${this.portrait}" alt = "Lien vers la page du photographe ${this.name}"></div>
        <h2 class = "name"> ${this.name}</h2>
        <p class = "place"> ${this.city}, ${this.country} </p>
        <p class = "tagline> ${this.tagline} </p>
        <p class = "price"> ${this.price} </p>
        </a>
        `
}