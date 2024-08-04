const fs = require("fs");
const path = require("path");

const getGenreListFromFile = (cb) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "genreList.json"
  );

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Genre {
  static fetchAll(cb) {
    getGenreListFromFile((genreList) => {
      cb(genreList);
    });
  }

  static fetchById(genreId, cb) {
    getGenreListFromFile((genreList) => {
      const genre = genreList.find((item) => item.id === genreId);
      cb(genre);
    });
  }
};
