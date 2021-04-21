const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const messages = require('../utils/constans');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства email
        return validator.isEmail(v); // если не почта, вернётся false
      },
      message: 'Значение должно соответствовать схеме электронной почты.', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: [true],
    select: false,
  },
  name: {
    type: String,
    // required: [true, 'отсутствует обязательное поле "имя пользователя"'],
    minlength: [2],
    maxlength: [30],
    required: [true],
  },

});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error(messages.loginErrMessage));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(messages.loginErrMessage));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
