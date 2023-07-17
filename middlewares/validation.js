const {
  celebrate,
  Joi,
} = require('celebrate');

const { REGEXP_LINK } = require('../utils/consts');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP_LINK),
    trailerLink: Joi.string().required().pattern(REGEXP_LINK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(REGEXP_LINK),
    movieId: Joi.string().required().hex().length(24),
  }),
});

const deletMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  updateProfileValidation,
  createMovieValidation,
  deletMovieValidation
};
