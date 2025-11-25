import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/auth.js';
import { upload } from '../middlewares/multer.js';
import { getUserController, patchUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getUserController));
router.patch('/', upload.single('photo'), validateBody(updateUserSchema), ctrlWrapper(patchUserController));

export default router;
