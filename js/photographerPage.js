import { getMedias } from "./api";

//Fetch
fetch("./data/FishEyeData.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = "+ response.status") ;
        }
        return response.json();
    })

    //Get Médias & ID
    .then(function (json) {
        let list = new MediaList();
        let factory = new MediaFactory();
        let medias = getMedias(json.media);
        let profil = json.photographers((photographers) == MediaQueryList("id")) [0];
        let photographer = new Photographer(profil);

        photographer.displayProfil();

        medias.forEach((item) => {
            let media = factory.build(item);
            list.add(media);
        });

        list.build(list.all);
    });