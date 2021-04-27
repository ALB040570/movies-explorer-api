const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const messages = require('../utils/constans');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const postMovie = (req, res, next) => {
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
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(messages.postMovieConflictErrorMessage));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie
    .findById({ _id: req.params.movieId }).select('+owner')
    .orFail(() => new NotFoundError(messages.getMovienotFoundErrorMessage))
    .then((movie) => {
      if (!movie.owner._id.equals(req.user._id)) {
        next(new Forbidden(messages.deleteMovieforbiddenMessage));
      } else {
        Movie.deleteOne(movie).select('-owner')
          .then(() => {
            res.send({ message: `${messages.deleteMovieSuccesBeginMessage} ${movie.nameRU} ${messages.deleteMovieSuccesFinalMessage}` });
          });
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
