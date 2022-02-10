//Lightbox
class Slider {
  constructor(medias) {
      this.slides = document.querySelectorAll(".diapo");
      this.slider = document.getElementById("slider");
      this.container = this.slider.getElementsByClassName("slider-content")[0];
      this.medias = medias;
      this.currentIndex = 0;
  }

  //launch lightbox
  listenForStart() {
      this.slides.forEach((slide) => {
          slide.addEventListener("click", (e) => {
              this.slider.style.display = "flex";
              let id = e.target.getAttribute("id");
              this.currentIndex = this.medias.findIndex((media) => media.id == id);

              this.display();
          });
      });
      this.listenForMoves();
  }
  listenForStartKeyboard() {
      this.slides.forEach((slide) => {
          slide.addEventListener("keyup", (e) => {
              if (e.keyCode == 13) {
                  this.slider.style.display = "flex";
                  let id = e.target.getAttribute("id");
                  this.currentIndex = this.medias.findIndex((media) => media.id == id);

                  this.display();
                  document.getElementById("message-nav-txt").style.display = "block";
              }
          });
      });
  }

  //Nav in lightbox key + arrow
  listenForMoves() {
      let next = document.getElementById("next");
      let previous = document.getElementById("previous");

      document.addEventListener("keydown", (e) => {
          if (e.keyCode == 39) {
              this.next();
              this.display();
          }
      });

      document.addEventListener("keydown", (e) => {
          if (e.keyCode == 37) {
              this.previous();
              this.display();
          }
      });

      next.addEventListener("click", () => {
          this.next();
          this.display();
      });
      previous.addEventListener("click", () => {
          this.previous();
          this.display();
      });
  }

  //Lightbox function
  display() {
      let media = this.medias[this.currentIndex];
      let html = "";
      html += media.renderSlide();
      this.container.innerHTML = html;
  }

  next() {
      if (this.currentIndex >= this.medias.length - 1) {
          this.currentIndex = 0;
      } else {
          this.currentIndex++;
      }
  }

  previous() {
      if (this.currentIndex <= 0) {
          this.currentIndex = this.medias.length - 1;
      } else {
          this.currentIndex--;
      }
  }
}