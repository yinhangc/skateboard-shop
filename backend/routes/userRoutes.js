import express from 'express';
const router = express.Router();
import { addToUserCart, authUser, getUserProfile, registerUser, removeFromUserCart } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.post('/cart', protect, addToUserCart)
router.delete('/cart/:id', protect, removeFromUserCart)

export default router;