import express from 'express';
import {moviesController} from '../controllers/index.js';
import { authenticate } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/toprated', moviesController.getTopRatedMovies);
router.get('/:id', authenticate,moviesController.getMovieById);

export default router;