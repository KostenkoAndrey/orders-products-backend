import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createOrderSchema, updateOrderSchema } from '../validation/orders.js';
import { isValidOrderId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  getOrdersController,
  getOrdersByIdController,
  createOrderController,
  deleteOrderController,
  upsertOrderController,
  patchOrderController,
} from '../controllers/orders.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getOrdersController));
router.get('/:orderId', isValidOrderId, ctrlWrapper(getOrdersByIdController));
router.post('/', validateBody(createOrderSchema), ctrlWrapper(createOrderController));
router.delete('/:orderId', isValidOrderId, ctrlWrapper(deleteOrderController));
router.put('/:orderId', isValidOrderId, validateBody(createOrderSchema), ctrlWrapper(upsertOrderController));
router.patch('/:orderId', isValidOrderId, validateBody(updateOrderSchema), ctrlWrapper(patchOrderController));

export default router;
