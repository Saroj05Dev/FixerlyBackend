// src/repositories/userRepository.js
const User = require("../schema/userSchema");

async function findUser(params) {
    try { return await User.findOne({ ...params }); }
    catch (error) { throw error; }
}



async function findUserById(id) {
    try { return await User.findById(id).select("-password"); }
    catch (error) { throw error; }
}

async function updateUserById(id, updatedData) {
    try {
        return await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }).select("-password");
    } catch (error) { throw error; }
}

async function createUser(userDetails) {
    try { return await User.create(userDetails); }
    catch (error) { throw error; }
}
async function getAllUsers() {
    return await User.find().select("-password");
}
module.exports = { findUser, findUserById, updateUserById, createUser, getAllUsers };