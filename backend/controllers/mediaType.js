const MediaType = require("../models/MediaType");

exports.getMediaTypeList = (req, res, next) => {
  MediaType.fetchAll((mediaTypeList) => {
    res.json(mediaTypeList);
  });
};
