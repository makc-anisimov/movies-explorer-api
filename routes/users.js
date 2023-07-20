const router = require('express').Router();
const {
  updateProfileValidation,
} = require('../middlewares/validation');

const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');

// GET /users/me # возвращает информацию о пользователе (email и имя)
router.get('/me', getUserMe);

// PATCH /users/me # обновляет информацию о пользователе (email и имя)
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
