//Photograph List
class List {
    constructor() {
      this.all = [];
    }
    add(photographer) {
      this.all.push(photographer);
    }
  
    //HTML => create photograph page
    displayPhotographers(photographes) {
      console.log(photographes);
      let html = "";
  
      for (let i = 0; i < photographes.length; i++) {
        let photographe = new Photographer(photographes[i]);
        html += photographe.render();
      }
      document.querySelector("main").innerHTML = html;
    }
  
    hideAll() {
      document.querySelector("main").innerHTML = "";
    }
  }