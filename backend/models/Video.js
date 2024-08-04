const fs = require("fs");
const path = require("path");

const getVideosFromFile = (cb) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "videoList.json"
  );

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Video {
  static fetchMovieTrailer(filmId, cb) {
    const getNearestVideo = (videos) => {
      let nearestVideo = videos[0];

      for (let i = 1; i < videos.length; i++) {
        const currentVideoDate = new Date(videos[i].published_at);
        const nearestVideoDate = new Date(nearestVideo.published_at);

        if (currentVideoDate > nearestVideoDate) {
          nearestVideo = videos[i];
        }
      }

      return nearestVideo;
    };

    getVideosFromFile((videos) => {
      const foundVideos = videos.find((video) => video.id === filmId);
      const filtedVideos = foundVideos?.videos.filter(
        (video) => video.official && video.site === "YouTube"
      );
      const trailers = filtedVideos?.filter(
        (video) => video.type === "Trailer"
      );
      const teasers = filtedVideos?.filter((video) => video.type === "Teaser");

      if (trailers?.length > 0) {
        cb(getNearestVideo(trailers));
      } else {
        cb(teasers && getNearestVideo(teasers));
      }
    });
  }
};
