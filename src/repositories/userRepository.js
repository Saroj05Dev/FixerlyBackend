const User = require("../schema/userSchema");

async function findUser(params) {
    try {
        const user = await User.findOne({ ...params })
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function findUserById(id) {
    try {
        const uesr = await User.findById(id).select("-password");
        return uesr;
    } catch (error) {
        console.log('Error in findUserById:', error);
        throw error
    }
}

async function updateUserById(id, updatedData) {
    try {
        const newUser = await User.findByIdAndUpdate(id, updatedData, 
        { 
            new: true,
            runValidators: true
        }).select("-password");
        return newUser
    } catch (error) {
        console.log('Error in updating user', error)
        throw error
    }
}

async function createUser(userDetails) {
    try {
        const user = await User.create(userDetails);
        return user;
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    findUser,
    findUserById,
    updateUserById,
    createUser
}