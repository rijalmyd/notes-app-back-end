import { Router } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  deleteNoteById,
  editNoteById,
} from '../controller/controller.js';
import validate from '../../../middlewares/validate.js';
import { notePayloadSchema, noteQuerySchema, noteUpdatePayloadSchema } from '../validator/schema.js';
import validateQuery from '../../../middlewares/validate-query.js';

const router = Router();

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes', validateQuery(noteQuerySchema), getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;