const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  updateProfileValidation,
} = require('../middlewares/validation');
const errorHandler = require('../middlewares/error-handler');

const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
router.get('/me', auth, getUserMe);
// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
router.patch('/me', auth, updateProfileValidation, updateProfile);
router.use(errorHandler);


module.exports = router;
