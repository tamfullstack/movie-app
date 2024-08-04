const express = require("express");

const mediaTypeController = require("../controllers/mediaType");

const router = express.Router();

router.get("/", mediaTypeController.getMediaTypeList);

module.exports = router;
