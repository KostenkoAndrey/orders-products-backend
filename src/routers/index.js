import { Router } from 'express';

import productsRouter from './products.js';
import ordersRouter from './orders.js';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);

export default router;
