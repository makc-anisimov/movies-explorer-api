const router = require('express').Router();
const { errors } = require('celebrate');
const errorHandler = require('../middlewares/error-handler');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const {
  login,
  createUser,
} = require('../controllers/users');
const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
require('dotenv').config();

router.use(requestLogger);

// POST /signin # проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', loginValidation, login);

// POST /signup # создаёт пользователя с переданными в теле email, password и name
router.post('/signup', createUserValidation, createUser);

// основные маршруты защищенные авторизацией
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

// # ответ на любые другие маршруты
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

router.use(errorLogger);
router.use(errors()); // обработчик ошибок celebrate
router.use(errorHandler);
router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

module.exports = router;