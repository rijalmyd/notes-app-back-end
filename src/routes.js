import express from 'express';
import {
  createNote,
  editNoteById,
  getNoteById,
  getNotes,
  deleteNoteById
} from './controller.js';

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;