const fs = require("fs");
const path = require("path");

module.exports = class UserToken {
  static authorize(token, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "userToken.json"
    );

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(false);
      } else {
        const userToken = JSON.parse(fileContent);
        cb(userToken.some((item) => item.token === token));
      }
    });
  }
};
