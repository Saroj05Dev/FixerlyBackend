const { findUser, createUser, findUserById, updateUserById } = require("../repositories/userRepository");
const { findOtp } = require("../repositories/otpRepository");
const bcrypt = require("bcrypt");

async function getUserProfile(userId) {
    try {
        const user = await findUserById(userId);
        if(!user) {
            throw { reason: "User not found", statusCode: 400 };
        }
        return user;
    } catch (error) {
        throw { reason: error.reason || "Failed to fetch user profile", statusCode: error.statusCode || 500 };
    }
}

async function updateUserProfile(id, updatedData) {
    try {
        //1. Check if a new password is being updated
        if (updatedData.password) {
            // 2. Hash the new password before sending to the database
            const hashedPassword = await bcrypt.hash(updatedData.password, 10);
            updatedData.password = hashedPassword;
        }
        // 3. Perform the update
        const updatedUser = await updateUserById(id, updatedData);

        if(!updatedUser) {
            throw { reason: "User not found or update failed", statusCode: 400 };
        }

        return updatedUser
    } catch (error) {
        // Handle MongoDB/validation errors
        let reason = "Failed to update user profile";
        if (error.code === 11000) {
            reason = "A user with this email or phone number already exists.";
        } else if (error.name === 'ValidationError') {
            reason = error.message;
        }

        throw { 
            reason: reason, 
            statusCode: error.statusCode || 400 
        };
    }
}

async function registerUser(userDetails) {
    const user = await findUser({ email: userDetails.email });
    const existingPhone = await findUser({ phone: userDetails.phone });

    if (user || existingPhone) {
        throw { reason: "User with this email or phone already exists", statusCode: 400 };
    }

    // ensure OTP was verified (no OTP doc should exist now)
    const otpStillExists = await findOtp(userDetails.phone);
    if (otpStillExists) {
        throw { reason: "Phone number not verified yet", statusCode: 400 };
    }

    const newUser = await createUser({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        phone: userDetails.phone,
        role: userDetails.role,
        isVerified: true // set verified after OTP check
    });

    if (!newUser) throw { reason: "Something went wrong creating user", statusCode: 500 };

    return newUser;
}

module.exports = { 
    getUserProfile,
    updateUserProfile,
    registerUser 
};
