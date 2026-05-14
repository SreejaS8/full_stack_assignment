import { Router } from 'express';
import { createMatch, getMatches } from '../controllers/matchController.js';

const router = Router();

router.post('/match', createMatch);
router.get('/matches', getMatches);

export default router;
