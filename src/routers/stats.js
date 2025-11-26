import { Router } from 'express';
import { getWebSocketStatsController } from '../controllers/stats.js';

const router = Router();

router.get('/', getWebSocketStatsController);

export default router;
