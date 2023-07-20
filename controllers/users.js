require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AccessDeniedError = require('../errors/access-denied-err');
const ConflictError = require('../errors/conflict-err');

const {
  JWT_SECRET,
  NODE_ENV,
} = process.env;
const {
  STATUS_OK,
  CREATED,
} = require('../utils/consts');

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((createdUser) => {
      res.status(CREATED).send({
        email: createdUser.email,
        name: createdUser.name,
        _id: createdUser._id,
      });
    })
    .catch(next);
    // .catch(() => {
    //   const err = new ConflictError('Такой email уже зарегистрирован');
    //   next(err);
    // });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    },
  ).then((result) => {
    if (!result) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(STATUS_OK).send(result);
  }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new AccessDeniedError('Неправильная почта или пароль');
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AccessDeniedError('Неправильная почта или пароль');
      }
      const {
        name,
        about,
        avatar,
        _id,
      } = user;
      return {
        name,
        about,
        avatar,
        email,
        _id,
      };
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign(
        { _id: user._id.toString() },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ jwt });
    })
    .catch(next);
};

module.exports = {
  getUserMe,
  createUser,
  updateProfile,
  login,
};
