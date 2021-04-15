const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  // country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: [true, 'отсутствует обязательное поле "страна создания фильма"'],
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: [true, 'отсутствует обязательное поле "режиссёр фильма"'],
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: [true, 'отсутствует обязательное поле "длительность фильма"'],
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: [true, 'отсутствует обязательное поле "год выпуска фильма"'],
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: [true, 'отсутствует обязательное поле "описание фильма"'],
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    required: [true, 'отсутствует обязательное поле "ссылка на постер к фильму"'],
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9\-]+\.[a-z]+)(\/[\w\-\._~:\/\?#\[\]@\!\$&'\(\)\*\+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: 'унифицированный указатель ресурса (URL-адрес) начинается не с http:// или https:// или не указан домен',
    },
  },
  // trailer — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailer: {
    type: String,
    required: [true, 'отсутствует обязательное поле "ссылка на трейлер фильма"'],
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9\-]+\.[a-z]+)(\/[\w\-\._~:\/\?#\[\]@\!\$&'\(\)\*\+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: 'унифицированный указатель ресурса (URL-адрес) начинается не с http:// или https:// или не указан домен',
    },
  },
  // thumbnail — миниатюрное изображение постера к фильму.
  // Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: [true, 'отсутствует обязательное поле "миниатюрное изображение постера к фильму"'],
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9\-]+\.[a-z]+)(\/[\w\-\._~:\/\?#\[\]@\!\$&'\(\)\*\+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: 'унифицированный указатель ресурса (URL-адрес) начинается не с http:// или https:// или не указан домен',
    },
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId — _id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: [true, 'отсутствует обязательное поле "название фильма на русском языке"'],
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: [true, 'отсутствует обязательное поле "название фильма на английском языке"'],
  },

});

// совместный индекс для обеспечения уникальности пары: пользоваатель - фильм
movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
