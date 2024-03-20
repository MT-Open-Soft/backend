const express = require('express');
const moviesController = require('../controllers/movies.controller');
// const moviesService = require('../services/movies.service');
const router = express.Router();

router.get('/movies', moviesController.getMovies);
router.get('/movies/:id', moviesController.getMovieById);
module.exports = router;