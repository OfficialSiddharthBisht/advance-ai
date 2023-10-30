const express = require("express");
const {
    summarization
} = require('../controllers/extractTextPdf.controller')
const router = express.Router();

// router.route("/openai").get(isAuthenticatedUser,openAi);
router.route("/summarize").post(summarization);


module.exports = router;