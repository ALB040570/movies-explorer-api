require('dotenv').config();

const { NODE_ENV, DB_CONNECT } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;

const app = express();
// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DB_CONNECT : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { errors } = require('celebrate');
const moviesRouter = require('./routes/movies.js');
const userRouter = require('./routes/users.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { postSignUpValidate, postSignInValidate } = require('./middlewares/validations');
const NotFoundError = require('./errors/not-found-err');

// app.use('*', cors(options));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// роуты, не требующие авторизации
app.post('/signup', postSignUpValidate, createUser);
app.post('/signin', postSignInValidate, login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна

app.use('/', moviesRouter);
app.use('/', userRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок
// здесь обрабатываем все ошибки
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use(errorHandler);

app.listen(PORT);
