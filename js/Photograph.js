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
    return  `
        <a tabindex="15" href="photographer.html?id = ${this.id}" class="">
        <div class = "portrait"> <img src = "img/photographersID/${this.portrait}" alt = "Lien vers la page du photographe ${this.name}"></div>
        <h2 class = "name"> ${this.name}</h2>
        <p class = "place"> ${this.city}, ${this.country} </p>
        <p class = "tagline> ${this.tagline} </p>
        <p class = "price"> ${this.price} </p>
        </a>
        `
   
    //Photograph profil
    displayProfil () {
        document.getElementById("profilName").innerHTML = `${this.name}`;
        document.getElementById("profilLocation").innerHTML = `<h2> ${this.city}, ${this.country} </h2>`;
        document.getElementById("profilTagline").innerHTML = ${this.tagline};
        document.getElementById("profilPortrait").innerHTML = `<img src ="img/photographersID/${this.portrait}" alt ="Photo de profil du photographe ${this.name}">`;
        document.getElementById("form-title-name").innerHTML = ${this.name};
        document.getElementById("scrollPrice").innerHTML = `${this.price}€/jour`;
    }    
}

