import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createProductSchema, updateProductSchema } from '../validation/products.js';
import { isValidProductId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import {
  getProductsController,
  getProductsByIdController,
  createProductController,
  deleteProductController,
  upsertProductController,
  patchProductController,
} from '../controllers/products.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getProductsController));
router.get('/:productId', isValidProductId, ctrlWrapper(getProductsByIdController));
router.post('/', upload.single('photo'), validateBody(createProductSchema), ctrlWrapper(createProductController));
router.delete('/:productId', isValidProductId, ctrlWrapper(deleteProductController));
router.put('/:productId', isValidProductId, upload.single('photo'), validateBody(createProductSchema), ctrlWrapper(upsertProductController));
router.patch('/:productId', isValidProductId, upload.single('photo'), validateBody(updateProductSchema), ctrlWrapper(patchProductController));

export default router;
