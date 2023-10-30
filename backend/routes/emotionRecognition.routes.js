const express = require("express");
const {emotionRecognition} = require("../controllers/emotionRecognition.controller");
const router = express.Router();

router.route("/emotion").post(emotionRecognition);


module.exports = router;