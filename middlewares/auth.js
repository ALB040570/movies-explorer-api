const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const messages = require('../utils/constans');
const Unauthorized = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  // тут вся авторизация
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(messages.unauthorizedMessage));
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new Unauthorized(messages.unauthorizedMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
