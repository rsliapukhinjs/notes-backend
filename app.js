const config = require("./utils/config");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));

const cors = require("cors");
app.use(cors());

const notesRouter = require("./controllers/notes");
app.use("/api/notes", notesRouter);

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);

const mongoose = require("mongoose");
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

module.exports = app;
