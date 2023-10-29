const express = require("express");
const {
    analyzeController
} = require('../controllers/analyze.controller')
const router = express.Router();

// router.route("/openai").get(isAuthenticatedUser,openAi);
router.route("/analyze").post(analyzeController);


module.exports = router;