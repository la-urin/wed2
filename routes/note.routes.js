import express from 'express';
const router = express.Router();
import { noteController } from '../controllers/note.controller';

router.get('/:id', noteController.get.bind(noteController));
router.post('/', noteController.insert.bind(noteController));
router.put('/:id', noteController.update.bind(noteController));
router.delete('/:id', noteController.delete.bind(noteController));

export default router;

