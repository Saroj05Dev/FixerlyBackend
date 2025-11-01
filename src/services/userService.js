// src/services/userService.js
const { findUser, createUser, findUserById, updateUserById } = require("../repositories/userRepository");
const { findOtp } = require("../repositories/otpRepository");
const bcrypt = require("bcrypt");

async function getUserProfile(userId) {
    try {
        const user = await findUserById(userId);
        if (!user) throw { reason: "User not found", statusCode: 400 };
        return user;
    } catch (error) {
        throw { reason: error.reason || "Failed to fetch user profile", statusCode: error.statusCode || 500 };
    }
}

async function updateUserProfile(id, updatedData) {
    try {
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        delete updatedData.role; delete updatedData._id;
        const updatedUser = await updateUserById(id, updatedData);
        if (!updatedUser) throw { reason: "User not found or update failed", statusCode: 400 };
        return updatedUser;
    } catch (error) {
        let reason = "Failed to update user profile";
        if (error.code === 11000) reason = "Email or phone already exists";
        else if (error.name === 'ValidationError') reason = error.message;
        throw { reason, statusCode: error.statusCode || 400 };
    }
}

async function registerUser(userDetails) {
    const user = await findUser({ email: userDetails.email });
    const existingPhone = await findUser({ phone: userDetails.phone });

    if (user || existingPhone) {
        throw { reason: "User with this email or phone already exists", statusCode: 400 };
    }

    const otpStillExists = await findOtp(userDetails.phone);
    if (otpStillExists) {
        throw { reason: "Phone number not verified yet", statusCode: 400 };
    }

    const newUser = await createUser({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        phone: userDetails.phone,
        role: userDetails.role || "user",
        isVerified: true
    });

    if (!newUser) throw { reason: "Failed to create user", statusCode: 500 };
    return newUser;
}
async function getAllUsersService() {
    return await require("../repositories/userRepository").getAllUsers();
}
module.exports = { getUserProfile, updateUserProfile, registerUser, getAllUsersService };