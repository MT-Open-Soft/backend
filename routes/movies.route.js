import express from 'express';
import {moviesController} from '../controllers/index.js';

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovieById);

export default router;