//Loading file source
async function getPhotographers() {
  let photographers = await fetch ("../data/FishEyeData.json")
      .then((response) => response.json())
      .then((data) => {
          return data.photographers;
      }
      function (rejectionReason) { // 3
        console.log('Erreur lors de l'analyse JSON de la réponse :', rejectionReason, responseClone); // 4
        responseClone.text() // 5
        .then(function (bodyText) {
            console.log('Réception des données suivantes au lieu de données JSON valides :', bodyText); // 6
        }););
  return photographers;
}


async function getMedias() {
  let medias = await fetch ("../data/FishEyeData.json")
      .then((response) => response.json())
      .then((data) => {
          return data.media;
      });
  return medias;
}

//Exports
export {
  getPhotographers
};
export {
  getMedias
};