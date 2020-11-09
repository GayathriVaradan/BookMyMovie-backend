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
router.get("/:theaterId", async (req, res) => {
  res.send(req.theater);
});

// post theater info
router.post("/", async (req, res) => {
  const { name, numberOfSeatsAvailable, seats } = req.body;
  try {
    if (theaterName && numberOfSeatsAvailable) {
      const theater = new Theater({
        theaterName,
        numberOfSeatsAvailable,
        seats,
      });
      await theater.save();
      return res.json(theater);
    }
    return res
      .status(400)
      .json({ message: "please include all theater details" });
  } catch (err) {
    return res.status(500).send({
      message: "Could not add the theater.",
    });
  }
});
module.exports = router;
