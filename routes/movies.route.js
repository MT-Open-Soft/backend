const express = require('express');
// const moviesController = require('../controllers/movies.controller');
const moviesService = require('../services/movies.service');
const router = express.Router();

router.get('/movies', moviesService.getMovies);
router.get('/movies/:id', moviesService.getMovieById);
module.exports = router;