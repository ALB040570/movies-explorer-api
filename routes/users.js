const router = require('express').Router();

const { patchUserValidate } = require('../middlewares/validations');

const {
  getProfile, patchProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', patchUserValidate, patchProfile);

module.exports = router;
