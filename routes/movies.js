const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createMovieValidation,
  deletMovieValidation,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');


// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', auth, getMovies);

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies
router.post('/', auth, createMovieValidation, createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', auth, deletMovieValidation, deleteMovie);

module.exports = router;
