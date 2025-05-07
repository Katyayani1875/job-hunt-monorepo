import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController.js';
import { verifyUser } from '../middleware/authMiddleware.js'; // Correctly importing verifyUser as named import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyUser, getUserProfile);  // Use verifyUser here
router.put('/me', verifyUser, updateUserProfile);
router.delete('/me', verifyUser, deleteUserAccount);

export default router;
