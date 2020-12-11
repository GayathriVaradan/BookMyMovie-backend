# Book My Movie

[![Actions Status](https://github.com/GayathriVaradan/BookMyMovie-backend/workflows/Run%20Lint/badge.svg)](https://github.com/GayathriVaradan/BookMyMovie-backend/actions)
This project is a movie booking website using MERN stack

## Movie Router

1. Read (all movies) Route: GET '/api/v1/movie'
2. Read (movie by Id) Route: GET '/api/v1/movie/movieId'
3. Read (movie by title) Route: GET '/api/v1/movie/title/:title'

## Theater Router

1. Read (all theaters) Route: GET '/api/v1/theater'
2. Read (theater by movie title) Route: GET '/api/v1/theater/:title'

## SeatsUnavailable Router

1. Read (seats unavailable for all movies, theater and shows ) Route: GET '/api/v1/seatsUnavailable'
2. Read (seats unavailable for selected movies, theater and show by movieId) Route: GET '/api/v1/seatsUnavailable/movieId'
3. Patch (seats unavailable updated for selected movies, theater and show) Route: GET '/api/v1/seatsUnavailable/theater_Id/:theaterId/theaterName/:theaterName/show/:show'

## Seed Database

In the seed-db folder you will find the import script and a folder named data, with all the movie, theater and seatsUnavailable that will be saved in db. Every time you run this file, this specific collection of questions will be drop and created again.

To insert/update all movies, theaters and seatsUnavailable in database:

npm install
npm run seedDb
