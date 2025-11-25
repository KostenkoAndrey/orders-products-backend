import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema, loginWithGoogleOAuthSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
router.post('/confirm-oauth', validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController));

export default router;
