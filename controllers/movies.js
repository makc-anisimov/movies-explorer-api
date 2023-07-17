const Movie = require('../models/movies');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const {
  STATUS_OK,
  CREATED,
} = require('../utils/consts');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(STATUS_OK).send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  return Movie.create({ name, link, owner: req.user._id })
    .then((createdCard) => {
      res.status(CREATED).send(createdCard);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав доступа');
      }
      return movie.deleteOne()
        .then(() => {
          res.status(STATUS_OK).send({ message: 'Фильм удален' });
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};
