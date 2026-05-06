import { Hono } from 'hono'
import * as userController from '../../controllers/users/userController'
import { asyncHandler } from '../../middlewares/asyncHandler'

const router = new Hono()

router.get('/', asyncHandler(userController.listUsers))
router.get('/:id', asyncHandler(userController.getUser))
router.put('/:id', asyncHandler(userController.updateUser))

router.get('/roles', asyncHandler(userController.listRoles))
router.post('/roles', asyncHandler(userController.createRole))

export default router
