const messages = require('../utils/constans');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `${messages.serverErrorMessage} ${err.message}` });
  }

  next();
};

module.exports = errorHandler;
