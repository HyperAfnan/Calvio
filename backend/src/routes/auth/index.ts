import { Hono } from 'hono';
import * as authController from '../../controllers/auth/authController';
import { asyncHandler } from '../../middlewares/asyncHandler';

const router = new Hono();

router.post('/register', asyncHandler(authController.register));

router.post('/login', asyncHandler(authController.login));

router.get('/me', asyncHandler(authController.me));

router.post('/logout', asyncHandler(authController.logout));

export default router;
