const { registerUser, getUserProfile, updateUserProfile } = require("../services/userService");
const { sendOtp, verifyOtp } = require("../services/otpService");

async function getProfile(req, res) {
    try {
        const userId = req.user.id;
        const user = await getUserProfile(userId);

        return res.status(200).json({
            message: "Successfully fetched user profile",
            success: true,
            data: user,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Couldn't fetch user profile",
            success: false,
            error: error.reason || "Something went wrong"
        })
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        
        // Ensure no attempt to change role or ID
        delete updateData.role;
        delete updateData._id;

        const updatedUser = await updateUserProfile(userId, updateData);

        return res.status(200).json({
            message: "User profile updated successfully",
            success: true,
            data: updatedUser,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.reason || "Failed to update user profile",
            success: false,
            error: error.reason || "Something went wrong"
        });
    }
}

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

module.exports = { 
    getProfile,
    updateProfile,
    createUser, 
    sendOtpToUser, 
    verifyUserOtp,
};
