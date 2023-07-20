const router = require('express').Router();
// const auth = require('../middlewares/auth');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');


// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', getMovies);

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
router.post('/', createMovieValidation, createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
