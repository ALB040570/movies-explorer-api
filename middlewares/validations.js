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

const patchAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
  }),
});

const getProfileValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
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
      .regex(/^http[s]?:\/\/\w+/),
    trailer: Joi.string()
      .required()
      .regex(/^http[s]?:\/\/\w+/),
    thumbnail: Joi.string()
      .required()
      .regex(/^http[s]?:\/\/\w+/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  postSignUpValidate,
  postSignInValidate,
  patchUserValidate,
  patchAvatarValidate,
  getProfileValidate,
  postMoviesValidate,
  deleteMovieValidate,
};
