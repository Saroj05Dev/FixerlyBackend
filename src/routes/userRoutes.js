const express = require('express');
const { createUser, sendOtpToUser, verifyUserOtp, getProfile, updateProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/register/send-otp', sendOtpToUser);
userRouter.post('/register/verify-otp', verifyUserOtp);
userRouter.post('/', createUser);
userRouter.get('/profile', isAuthenticated, getProfile);
userRouter.put('/profile', isAuthenticated, updateProfile);

module.exports = userRouter;