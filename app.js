require('dotenv').config();

const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { config, mongooseParams } = require('./utils/config.js');

const {
  NODE_ENV, DB_CONNECT,
  PORT = config.PORT,
  MONGO = config.MONGO,
} = process.env;

const app = express();
// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DB_CONNECT : MONGO, mongooseParams);

const uniformRouter = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

app.use(cors());

app.use(helmet());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // подключаем ограничитель запросов

app.use('/', uniformRouter); // подключаем единый роут

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
