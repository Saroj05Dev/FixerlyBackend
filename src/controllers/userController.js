const { registerUser } = require("../services/userService");
const { sendOtp, verifyOtp } = require("../services/otpService");

async function sendOtpToUser(req, res) {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: "Phone is required" });

        await sendOtp(phone);
        return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ success: false, message: error.reason || "Failed to send OTP" });
    }
}

async function verifyUserOtp(req, res) {
    try {
        const { phone, otp } = req.body;
        await verifyOtp(phone, otp);
        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ success: false, message: error.reason || "Failed to verify OTP" });
    }
}

async function createUser(req, res) {
    try {
        const user = await registerUser(req.body);
        return res.status(201).json({
            message: "Successfully registered the user",
            success: true,
            data: user,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Couldn't create the user",
            success: false,
            error: error.reason || "Something went wrong"
        });
    }
}

module.exports = { createUser, sendOtpToUser, verifyUserOtp };
