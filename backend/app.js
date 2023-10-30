const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Custom-Header'],
  }));
  
app.use(express.json());
app.use(cookieParser());

// routes imports
const analyze = require("./routes/analyze.routes");
const summarize = require("./routes/extractTextPdf.routes");
const emotionRecognition = require("./routes/emotionRecognition.routes");

// routes use
app.use("/api/v1",analyze)
app.use("/api/v1",summarize);
app.use("/api/v1",emotionRecognition);
// middleware for errors
app.use(errorMiddleware)

module.exports = app;