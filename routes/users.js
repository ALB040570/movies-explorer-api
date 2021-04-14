const router = require('express').Router();

const { patchUserValidate, getProfileValidate } = require('../middlewares/validations');

const {
  getProfile, patchProfile, getProfileById,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getProfile);
router.get('/users/:userId', getProfileValidate, getProfileById);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', patchUserValidate, patchProfile);

module.exports = router;
