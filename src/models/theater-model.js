const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  theaterName: { type: String, required: true },
  dates: [
    {
      date: { type: String, required: true },
      movieName: { type: String, required: true },
      shows: [{ show: { type: String, required: true } }],
      seatsUnavailable: [],
    },
  ],
});
module.exports = mongoose.model("theaters", theaterSchema);
