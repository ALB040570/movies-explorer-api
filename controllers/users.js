const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const messages = require('../utils/constans');

const SALT_ROUNDS = 10;

const login = (req, res, next) => {
  const { email, password } = req.body;
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
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(messages.getUsernotFoundErrorMessage);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  // хешируем пароль
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(200).send({ message: messages.postUserSuccessMessage }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(messages.postUserConflictErrorMessage));
        return;
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
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(messages.postUserConflictErrorMessage));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getProfile,
  patchProfile,
};
