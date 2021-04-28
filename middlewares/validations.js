const { celebrate, Joi } = require('celebrate');

const postSignUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const postSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const patchUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// проверяет фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
const postMoviesValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .regex(/^HTTP|HTTPS|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([-.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/),
    trailer: Joi.string()
      .required()
      .regex(/^HTTP|HTTPS|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([-.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/),
    thumbnail: Joi.string()
      .required()
      .regex(/^HTTP|HTTPS|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([-.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/),

    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  postSignUpValidate,
  postSignInValidate,
  patchUserValidate,
  postMoviesValidate,
  deleteMovieValidate,
};
