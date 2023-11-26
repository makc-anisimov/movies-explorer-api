const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
} = require('../utils/consts');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'переданы некорректные данные' });
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  } else if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Такой пользователь уже зарегистрирован' });
  } else if(err.statusCode === 401) {
    res.status(err.statusCode).send({ message: 'Неправильная почта или пароль' });
  }
  else res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  next();
};

module.exports = errorHandler;
