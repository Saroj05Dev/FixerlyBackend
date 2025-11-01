const express = require('express');
const { createUser, sendOtpToUser, verifyUserOtp, getProfile, updateProfile,getAllUsers } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/register/send-otp', sendOtpToUser);
userRouter.post('/register/verify-otp', verifyUserOtp);
userRouter.post('/', createUser);
userRouter.get('/profile', isAuthenticated, getProfile);
userRouter.put('/profile', isAuthenticated, updateProfile);
// userRouter.get('/all', isAuthenticated, isAuthorized(['admin']), getAllUsers);

module.exports = userRouter;