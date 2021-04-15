const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const Unauthorized = require('../errors/unauthorized-err');

const SALT_ROUNDS = 10;

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidationError('Не передан емейл или пароль'));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' }, // токен будет просрочен через неделю после создания
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      next(new Unauthorized(err.message));
    });
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Не валидный ID'));
      }
      next(err);
    });
};

const getProfileById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Не валидный ID'));
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password) {
    next(new ValidationError('Не передан емейл или пароль'));
  }
  // хешируем пароль
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(200).send({ message: 'Пользователь создан!' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.errors.email.message));
      } else {
        next(new ConflictError('Такой пользователь уже существует'));
      }
      next(err);
    });
};

const patchProfile = (req, res, next) => {
  const { name, email } = (req.body);
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        if (err.errors.name) {
          next(new ValidationError(err.errors.name.message));
        } else {
          next(new ValidationError(err.errors.email.message));
        }
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getProfile,
  getProfileById,
  patchProfile,
};
