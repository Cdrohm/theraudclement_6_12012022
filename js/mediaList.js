//MediaList (all medias)

class MediaList {
    constructor() {
      this.all = [];
      this.activeTags = [];
      this.order = "";
      this.totalLikes = 0;
      this.hasClicked = [];

    }

    add(media) {
      this.all.push(media);
    }
  
    build() {
      this.display(this.all);
      this.listenForReordering();
      let slider = new Slider(this.all);
      slider.listenForStart();
      slider.listenForStartKeyboard();
      this.getAllLikesPhotographer();
      this.increaseMediaLikes();
      this.displayReorderList();
    }
  
    display(medias) {
      let html = "";
  
      medias.forEach((media) => {
        html += media.render();
      });
      document.getElementById("medias").innerHTML = html;
    }
  
  
    //Dropdown menu / Sort by pop/date/title
    displayReorderList() {
      let reorderAreaClosed = document.getElementById("sort-list_closed");
      let reorderAreaOpen = document.getElementById("sort-list");
      reorderAreaClosed.addEventListener("click", function (evt) {
        reorderAreaClosed.style.display = "none";
        reorderAreaOpen.style.display = "inline-flex";
        reorderAreaOpen.style.justifyContent = "start";
      });
      reorderAreaOpen.addEventListener("click", function (evt) {
        reorderAreaClosed.style.display = "inline-flex";
        reorderAreaOpen.style.display = "none";
      });
    }
  
    listenForReordering() {
      let elements = document.getElementsByClassName("sort-by");
      let reorderAreaFirst = document.getElementById("text-choice-change");
      for (let el of elements) {
        el.addEventListener("click", (e) => {
          let order = e.target.getAttribute("data-order");
  
          if(order) {
            this.order = order;
            el.style.order == "0";
    
            this.reorder(order);
            reorderAreaFirst.textContent = e.target.textContent;
          }
          
        });
      }
    }
  
    reorder(order) {
     // console.log(order);
      let methodName = "reorderBy" + ucfirst(order);
      
      this[methodName]();
      this.build(this.all);
    }

    //Popularity
    reorderByPopularity() {
      this.all = this.all.sort((a, b) => {
        return b.likes - a.likes;
      });
    }

    //Date
    reorderByDate() {
      this.all = this.all.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
  
        return dateB - dateA;
      });
    }

    //Title
    reorderByTitle() {
      this.all = this.all.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });
    }
  
  
    //Likes counter (popup) + likes/photograph
    increaseMediaLikes() {
      let hearts = document.getElementsByClassName("heart");
      for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        let selected = heart.parentNode;
  
        heart.addEventListener("click", (e) => {
          let id = e.target.getAttribute("data-id");
          let index = this.all.findIndex((media) => media.id == id);
          

          if(!this.hasClicked[id]) {
            
            let likes = this.all[index].likes + 1;
            this.all[index].likes = likes;
            document.getElementById("scrollLikes").innerHTML = likes;
            //[id] = sur chaque img de la data
            this.hasClicked[id] = true;
            
          selected.parentNode.children[0].innerHTML = likes;
          heart.setAttribute("style", "color:#901c1c");
          this.totalLikes++;
          document.getElementById("scrollLikes").innerHTML = this.totalLikes;
        }

        });
        heart.addEventListener("keyup", (e) => {
          if (e.keyCode == 13) {
            let id = e.target.getAttribute("data-id");
            let index = this.all.findIndex((media) => media.id == id);
            let likes = this.all[index].likes + 1;
            this.all[index].likes = likes;
            selected.parentNode.children[0].innerHTML = likes;
            heart.setAttribute("style", "color:#901c1c");
            this.totalLikes++;
            document.getElementById("scrollLikes").innerHTML = this.totalLikes;
          }
        });
      }
    }

    


    //Total count
    getAllLikesPhotographer() {
      let total = 0;
      this.all.forEach((media) => {
        total += media.likes;
      });
      this.totalLikes = total;
      document.querySelector("#scrollLikes").textContent = total;
    }
  }

  //One click by heart
  function onClick() {
    
    if(!this.hasClicked) {
      likes +=1;
      document.getElementById("scrollLikes").innerHTML = likes;
      hasClicked = true;
    }
  }