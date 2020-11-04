const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },
});
module.exports = mongoose.model("theaters", theaterSchema);
