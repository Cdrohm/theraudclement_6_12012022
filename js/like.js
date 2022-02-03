//Likes
/**
* like + count
* @param {*} photographerMedias 
*/
function likesIncrement(photographerMedias) {
    const domLikesSum = document.querySelector(".popup-text span.number");
  
    photographerMedias.forEach((media) => {
        let mediaLikesTextContent = media.likes;
        likesArray.push(mediaLikesTextContent); //click +
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const likesSum = likesArray.reduce(reducer);
        domLikesSum.textContent = likesSum;
    });
  
    //load like by data
    const mediaLikes = document.querySelectorAll("#likes-number");
  
    for (let i = 0; i < mediaLikes.length; i++) {
        mediaLikes[i].addEventListener("click", () => {
            mediaLikes[i].textContent = parseInt(mediaLikes[i].textContent) + 1;
            domLikesSum.textContent = parseInt(domLikesSum.textContent) + 1;
        });
    }
  }