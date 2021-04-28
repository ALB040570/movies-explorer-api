const mongoose = require('mongoose');
const messages = require('../utils/constans');

const movieSchema = new mongoose.Schema({
  // country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: [true],
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: [true],
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: [true],
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: [true],
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: [true],
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    required: [true],
    validate: {
      validator(v) {
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9-]+\.[a-z]+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: messages.urlErrorMessage,
    },
  },
  // trailer — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailer: {
    type: String,
    required: [true],
    validate: {
      validator(v) {
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9-]+\.[a-z]+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: messages.urlErrorMessage,
    },
  },
  // thumbnail — миниатюрное изображение постера к фильму.
  // Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: [true],
    validate: {
      validator(v) {
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9-]+\.[a-z]+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: messages.urlErrorMessage,
    },
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  // movieId — _id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: [true],
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: [true],
  },

});

// совместный индекс для обеспечения уникальности пары: пользователь - фильм
movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
