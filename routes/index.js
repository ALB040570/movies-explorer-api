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

// роуты, которым авторизация нужна
router.use('/movies', auth, moviesRouter);
router.use('/users', auth, userRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(messages.routNotFoundErrorMessage));
});

module.exports = router;
