//Loading file source
async function getPhotographers() {
  //let photographers = await fetch ("../data/FishEyeData.json")
  let photographers = await fetch ("https://github.com/Cdrohm/theraudclement_6_12012022/data/FishEyeData.json")
      .then((response) => response.json())
      .then((data) => {
          return data.photographers;
      });
  return photographers;
}


async function getMedias() {
 // let medias = await fetch ("../data/FishEyeData.json")
  let medias = await fetch ("https://github.com/Cdrohm/theraudclement_6_12012022/data/FishEyeData.json")
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