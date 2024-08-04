const fs = require("fs");
const path = require("path");

const getMediaTypesFromFile = (cb) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "mediaTypeList.json"
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
    getMediaTypesFromFile((mediaTypeList) => {
      cb(mediaTypeList);
    });
  }
};
