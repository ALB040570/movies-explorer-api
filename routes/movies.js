const router = require('express').Router();

const {
  postMoviesValidate, deleteMovieValidate,
} = require('../middlewares/validations');

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies.js');

// возвращает все сохранённые пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', postMoviesValidate, postMovie);

// удаляет сохранённый фильм по _id
router.delete('/movies/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
