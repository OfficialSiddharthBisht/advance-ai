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


// routes use
app.use("/api/v1",analyze)

// middleware for errors
app.use(errorMiddleware)

module.exports = app;