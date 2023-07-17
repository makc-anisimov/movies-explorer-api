const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const {
  login,
  createUser,
} = require('./controllers/users');
const {
  loginValidation,
  createUserValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin
app.post('/signin', loginValidation, login);

// # создаёт пользователя с переданными в теле
// # email, password и name
// POST /signup
app.post('/signup', createUserValidation, createUser);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});
app.listen(PORT, () => {
  console.log('START APP MY TEST!');
});
