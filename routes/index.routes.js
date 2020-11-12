import express from 'express';
const router = express.Router();
import { noteController } from '../controllers/note.controller';

router.get('/', noteController.getAll.bind(noteController));
router.get('/new', noteController.new.bind(noteController));

export default router;
