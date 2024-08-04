const UserToken = require("../models/UserToken");

module.exports = (req, res, next) => {
  const { token } = req.query;

  UserToken.authorize(token, (hasUser) => {
    if (!hasUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      next(error);
    }

    next();
  });
};
