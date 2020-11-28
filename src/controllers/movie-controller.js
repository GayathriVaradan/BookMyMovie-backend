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

// post movie info
router.post('/', async (req, res) => {
  console.log('req.body.name', req.body);
  const {
    theaterNames,
    title,
    year,
    genre,
    poster,
    contentRating,
    duration,
    releaseDate,
    storyLine,
    actors,
    imdbRating,
    posterUrl,
  } = req.body;
  try {
    if (
      theaterNames &&
      title &&
      year &&
      genre &&
      poster &&
      contentRating &&
      duration &&
      releaseDate &&
      storyLine &&
      actors &&
      imdbRating &&
      posterUrl
    ) {
      const movie = new Movie({
        theaterNames,
        title,
        year,
        genre,
        poster,
        contentRating,
        duration,
        releaseDate,
        storyLine,
        actors,
        imdbRating,
        posterUrl,
      });
      await movie.save();
      return res.json(movie);
    }
    return res
      .status(400)
      .json({ message: 'please include all movie details' });
  } catch (err) {
    return res.status(500).send({
      message: 'Could not add the movie.',
    });
  }
});

// Updates movie info
router.patch('/:movieId', async (req, res) => {
  try {
    const movie = { _id: req.movieId, ...req.body };
    await Movie.updateOne({ _id: req.movieId }, { $set: req.body });
    return res.send(movie);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
