//Fetch
fetch("/data/FishEyeData.json")
.then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })

  //Get Medias with ID
  .then(function (json) {
    let list = new MediaList();
    let factory = new MediaFactory();
    let medias = getMedias(json.media);
    let profil = json.photographers.filter(
      (photographe) => photographe.id == query("id")
    )[0];
    let photographer = new Photographer(profil);

    photographer.displayProfil();

    medias.forEach((item) => {
      let media = factory.build(item);
      list.add(media);
    });

    list.build(list.all);
  });

function getMedias(medias) {
  return medias.filter((media) => media.photographerId == query("id"));
}

//Close lightbox
let closeDiapo = document.getElementById("close-slider");
closeDiapo.addEventListener("click", closeSlider);
closeDiapo.addEventListener("keyup", closeSliderKeyboard);

function closeSlider() {
  slider.style.display = "none";
}
function closeSliderKeyboard(e) {
  if (e.keyCode == 13) {
    slider.style.display = "none";
  }
}