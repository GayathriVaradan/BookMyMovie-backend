const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
const movies = require("./controllers/movie-controller");
const theaters = require("./controllers/theater-controller");
app.use("/api/v1/movies", movies);
app.use("/api/v1/theaters", theaters);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// eslint-disable-next-line no-console
module.exports = app;
