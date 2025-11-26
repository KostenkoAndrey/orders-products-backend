import { Router } from 'express';

import productsRouter from './products.js';
import ordersRouter from './orders.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import statsRouter from './stats.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);
router.use('/stats', statsRouter);

export default router;
