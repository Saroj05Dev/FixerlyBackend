const express = require('express');
const { createUser, sendOtpToUser, verifyUserOtp } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/register/send-otp', sendOtpToUser);
userRouter.post('/register/verify-otp', verifyUserOtp);
userRouter.post('/', createUser);

module.exports = userRouter;