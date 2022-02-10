//MediaFactory => if img = img
//             => if video = video (add esle if, if sound on video)
class MediaFactory {
  build(data) {
      if (data.hasOwnProperty("image")) {
          data.src = data.image;

          return new Image(data);
      } else {
          data.src = data.video;

          return new Video(data);
      }
  }
}