const express = require('express');
const Theater = require('../models/theater');

const router = express.Router();
// verify the theater Id only one time
router.param('theaterId', async (req, res, next) => {
  try {
    const theater = await Theater.findOne({ _id: req.params.theaterId });
    if (!theater) {
      res.status(404).json({ message: 'theater id does not exist' });
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
router.get('/', async (req, res) => {
  const allTheaters = await Theater.find();
  return res.json(allTheaters);
});

// get theater by id
router.get('/:title', async (req, res) => {
  const theaterByMovie = await Theater.find({ title: req.params.title });
  return res.json(theaterByMovie);
});

module.exports = router;
