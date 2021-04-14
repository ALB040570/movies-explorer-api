const errorHandler = (err, req, res, next) => {
  if (err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `На сервере произошла ошибка ups: ${err.message}` });
  }

  next();
};

module.exports = errorHandler;
