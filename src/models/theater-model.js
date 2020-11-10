const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  theater: [
    { theaterName: { type: String, required: true } },
    {
      shows: [
        { show: { type: String, required: true } },
        { time: { type: String, required: true } },
        { seatsUnavailable: [{ type: Number }] },
      ],
    },
  ],
});
module.exports = mongoose.model("theaters", theaterSchema);
