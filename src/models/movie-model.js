const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  genre: { type: [String], required: true },
  poster: { type: String, required: true },
  contentRating: { type: String, required: true },
  duration: { type: String, required: true },
  releaseDate: { type: String, required: true },
  storyLine: { type: String, required: true },
  actors: { type: [String], required: true },
  imdbRating: { type: Number, required: true },
  posterUrl: { type: String, required: true },
});
module.exports = mongoose.model("Movie", movieSchema);
