const express = require('express');
const Movie = require('../models/movie-model');

const router = express.Router();

// verify the movie Id only one times
router.param('movieId', async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.movieId });
    if (!movie) {
      res.status(404).json({ message: 'movie id does not exist' });
    } else {
      req.movie = movie;
      req.movieId = req.params.movieId;
      next();
    }
  } catch (err) {
    res.status(500).send();
  }
});

// get movies if it has
router.get('/', async (req, res) => {
  const allMovies = await Movie.find();
  return res.json(allMovies);
});

// get movie by id
router.get('/:movieId', async (req, res) => {
  res.send(req.movie);
});
router.get('/title/:title', async (req, res) => {
  const movie = await Movie.find({ title: req.params.title });
  return res.json(movie);
});

module.exports = router;
