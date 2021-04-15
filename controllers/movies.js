const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');

const getMovies = (req, res, next) => {
  req.user = {
    _id: '6076c2ec8e7f7d84d6f9e914',
  };
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const postMovie = (req, res, next) => {
  req.user = {
    _id: '6076c2ec8e7f7d84d6f9e914',
  };
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      next(new ConflictError('Этот фильм уже сохранен текущим пользователем'));
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  req.user = {
    _id: '6076c2ec8e7f7d84d6f9e914',
  };
  Movie
    .findOne({ movieId: req.params.movieId })
    .orFail(() => new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (!movie.owner._id.equals(req.user._id)) {
        next(new Forbidden('Нельзя удалить фильм, сохраненный другим пользователем'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Невалидный id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
