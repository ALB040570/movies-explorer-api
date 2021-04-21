const router = require('express').Router();

const moviesRouter = require('./movies.js');
const userRouter = require('./users.js');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const messages = require('../utils/constans');

const { postSignUpValidate, postSignInValidate } = require('../middlewares/validations');

const NotFoundError = require('../errors/not-found-err');

// роуты, не требующие авторизации
router.post('/signup', postSignUpValidate, createUser);
router.post('/signin', postSignInValidate, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна

router.use('/', moviesRouter);
router.use('/', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError(messages.routNotFoundErrorMessage));
});

module.exports = router;
