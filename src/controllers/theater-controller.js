const express = require("express");
const Theater = require("../models/theater-model");
const router = express.Router();
// verify the theater Id only one time
router.param("theaterId", async (req, res, next) => {
  try {
    const theater = await Theater.findOne({ _id: req.params.theaterId });
    if (!theater) {
      res.status(404).json({ message: "theater id does not exist" });
    } else {
      req.theater = theater;
      req.theaterId = req.params.theaterId;
      next();
    }
  } catch (err) {
    res.status(500).send();
  }
});
// get theaters if it present
router.get("/", async (req, res) => {
  const allTheaters = await Theater.find();
  return res.json(allTheaters);
});

// get theater by id
router.get("/:title", async (req, res) => {
  const theaterByMovie = await Theater.find({ title: req.params.title });
  return res.json(theaterByMovie);
});
//TODO for seats Unavailable
router.patch("/:userId", async (req, res) => {
  try {
    if (req.body.products) {
      return res.status(400).json({ message: "Do not include products" });
    }
    const user = { _id: req.userId, ...req.body };
    await User.updateOne({ _id: req.userId }, { $set: req.body });
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
