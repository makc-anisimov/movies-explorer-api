const router = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');

// GET /movies // # возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// POST /movies // # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', createMovieValidation, createMovie);

// DELETE /movies/_id // # удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
