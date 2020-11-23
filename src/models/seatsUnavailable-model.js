const mongoose = require("mongoose");

const seatsUnavailableSchema = new mongoose.Schema({
  theater_id: { type: mongoose.ObjectId, required: true },
  title: { type: String, required: true },
  theaterName: { type: String, required: true },
  show: { type: String, required: true },
  time: { type: String, required: true },
  seatsUnavailable: [{ type: Number, required: true }],
});

module.exports = mongoose.model("seats", seatsUnavailableSchema);
